<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Activity;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\Opportunity;
use App\Models\OpportunityType;
use App\Models\PipelineStage;
use App\Models\ReferenceCategory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LeadService
{
    /**
     * Normalize a phone number to standard international format (+251...) or clean digits.
     */
    public function normalizePhone(?string $phone): ?string
    {
        if (blank($phone)) {
            return null;
        }

        // Remove all whitespace, dashes, parentheses, dots
        $cleaned = preg_replace('/[\s\-\(\)\.]/', '', trim($phone));

        // Format Ethiopian local format (09... or 07...) into international format (+251...)
        if (preg_match('/^0([97]\d{8})$/', $cleaned, $matches)) {
            return '+251' . $matches[1];
        }

        if (preg_match('/^251([97]\d{8})$/', $cleaned, $matches)) {
            return '+251' . $matches[1];
        }

        return $cleaned;
    }

    /**
     * Detect duplicate leads based on email, normalized phone, or exact company match.
     */
    public function findDuplicates(?string $email, ?string $phone, ?string $organization = null, ?int $excludeId = null): array
    {
        $email = blank($email) ? null : strtolower(trim($email));
        $normalizedPhone = $this->normalizePhone($phone);
        $rawPhone = blank($phone) ? null : trim($phone);

        if (!$email && !$normalizedPhone && blank($organization)) {
            return ['has_duplicates' => false, 'duplicates' => []];
        }

        $query = Lead::with('owner')->whereNull('deleted_at');

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        $query->where(function ($q) use ($email, $normalizedPhone, $rawPhone, $organization) {
            $hasCondition = false;

            if ($email) {
                $q->whereRaw('LOWER(email) = ?', [$email]);
                $hasCondition = true;
            }

            if ($normalizedPhone) {
                // Match either normalized or raw variants
                if ($hasCondition) {
                    $q->orWhere(function ($sub) use ($normalizedPhone, $rawPhone) {
                        $sub->where('phone', $normalizedPhone)
                            ->orWhere('phone', $rawPhone)
                            ->orWhere('phone', 'LIKE', '%' . substr($normalizedPhone, -9));
                    });
                } else {
                    $q->where(function ($sub) use ($normalizedPhone, $rawPhone) {
                        $sub->where('phone', $normalizedPhone)
                            ->orWhere('phone', $rawPhone)
                            ->orWhere('phone', 'LIKE', '%' . substr($normalizedPhone, -9));
                    });
                    $hasCondition = true;
                }
            }

            if (!blank($organization) && strlen(trim($organization)) >= 3) {
                $org = strtolower(trim($organization));
                if ($hasCondition) {
                    $q->orWhereRaw('LOWER(organization) = ?', [$org]);
                } else {
                    $q->whereRaw('LOWER(organization) = ?', [$org]);
                }
            }
        });

        $matches = $query->limit(5)->get();

        $duplicates = $matches->map(function (Lead $match) use ($email, $normalizedPhone, $rawPhone, $organization) {
            $matchedFields = [];
            if ($email && strtolower((string)$match->email) === $email) {
                $matchedFields[] = 'email';
            }
            if ($normalizedPhone && (
                $match->phone === $normalizedPhone ||
                $match->phone === $rawPhone ||
                str_ends_with((string)$match->phone, substr($normalizedPhone, -9))
            )) {
                $matchedFields[] = 'phone';
            }
            if (!blank($organization) && strtolower((string)$match->organization) === strtolower(trim($organization))) {
                $matchedFields[] = 'organization';
            }

            return [
                'id' => $match->id,
                'name' => $match->name,
                'organization' => $match->organization,
                'email' => $match->email,
                'phone' => $match->phone,
                'status' => $match->status,
                'priority' => $match->priority,
                'owner_name' => $match->owner?->full_name ?? $match->owner?->name ?? 'Unassigned',
                'owner_id' => $match->owner_user_id,
                'created_at' => $match->created_at?->toIso8601String(),
                'matched_fields' => $matchedFields,
            ];
        })->toArray();

        return [
            'has_duplicates' => count($duplicates) > 0,
            'count' => count($duplicates),
            'duplicates' => $duplicates,
        ];
    }

    /**
     * Compute an initial lead score (0-100) based on profile richness, size & priority.
     */
    public function calculateLeadScore(array $data): int
    {
        $score = 40; // baseline

        if (!empty($data['email'])) $score += 10;
        if (!empty($data['phone'])) $score += 10;
        if (!empty($data['organization'])) $score += 10;
        if (!empty($data['category_id'])) $score += 10;
        if (!empty($data['estimated_space_sqm']) && (float)$data['estimated_space_sqm'] > 200) $score += 10;
        if (!empty($data['estimated_headcount']) && (int)$data['estimated_headcount'] >= 50) $score += 10;

        $priority = $data['priority'] ?? 'medium';
        if ($priority === 'urgent') $score += 15;
        elseif ($priority === 'high') $score += 10;

        return min(100, max(10, $score));
    }

    /**
     * Create a new Lead with duplicate detection & audit trail.
     */
    public function createLead(array $data, ?User $actor, bool $force = false): array
    {
        $dupCheck = $this->findDuplicates(
            $data['email'] ?? null,
            $data['phone'] ?? null,
            $data['organization'] ?? null
        );

        if ($dupCheck['has_duplicates'] && !$force) {
            return [
                'success' => false,
                'duplicate_warning' => true,
                'duplicates' => $dupCheck['duplicates'],
                'message' => 'Potential duplicate lead detected matching email, phone, or company.',
            ];
        }

        $data['lead_score'] = $data['lead_score'] ?? $this->calculateLeadScore($data);
        $data['status'] = $data['status'] ?? Lead::STATUS_NEW;
        $data['priority'] = $data['priority'] ?? 'medium';

        $lead = Lead::create($data);

        // Record initial activity
        if (!empty($data['notes'])) {
            Activity::create([
                'lead_id' => $lead->id,
                'user_id' => $actor?->id,
                'activity_type' => 'note',
                'title' => 'Initial Lead Ingestion Note',
                'description' => $data['notes'],
                'status' => 'completed',
                'completed_at' => now(),
            ]);
        }

        AuditLogger::log(
            'lead.created',
            'Lead',
            $lead->id,
            null,
            $lead->toArray(),
            $actor
        );

        return [
            'success' => true,
            'lead' => $lead->fresh(['owner', 'source', 'category']),
        ];
    }

    /**
     * Update an existing Lead.
     */
    public function updateLead(Lead $lead, array $data, ?User $actor, bool $force = false): array
    {
        $emailChanged = isset($data['email']) && strtolower(trim((string)$data['email'])) !== strtolower(trim((string)$lead->email));
        $phoneChanged = isset($data['phone']) && $this->normalizePhone($data['phone']) !== $this->normalizePhone($lead->phone);

        if (($emailChanged || $phoneChanged) && !$force) {
            $dupCheck = $this->findDuplicates(
                $data['email'] ?? $lead->email,
                $data['phone'] ?? $lead->phone,
                $data['organization'] ?? $lead->organization,
                $lead->id
            );

            if ($dupCheck['has_duplicates']) {
                return [
                    'success' => false,
                    'duplicate_warning' => true,
                    'duplicates' => $dupCheck['duplicates'],
                    'message' => 'Update halted: Phone or Email matches an existing active lead.',
                ];
            }
        }

        $oldValues = $lead->toArray();
        $lead->update($data);

        AuditLogger::log(
            'lead.updated',
            'Lead',
            $lead->id,
            $oldValues,
            $lead->fresh()->toArray(),
            $actor
        );

        return [
            'success' => true,
            'lead' => $lead->fresh(['owner', 'source', 'category', 'activities']),
        ];
    }

    /**
     * Transition Lead Status with automatic timestamping and activity logging.
     */
    public function updateStatus(Lead $lead, string $status, ?string $reason, ?User $actor): Lead
    {
        $oldStatus = $lead->status;
        $updates = ['status' => $status];

        if ($status === Lead::STATUS_CONVERTED && !$lead->converted_at) {
            $updates['converted_at'] = now();
        }

        if ($status === Lead::STATUS_UNQUALIFIED) {
            $updates['disqualification_reason'] = $reason;
        }

        $lead->update($updates);

        // Record status change in activities timeline
        Activity::create([
            'lead_id' => $lead->id,
            'user_id' => $actor?->id,
            'activity_type' => 'status_change',
            'title' => "Status transitioned to " . ucfirst($status),
            'description' => $reason ?: "Stage changed from {$oldStatus} to {$status}",
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        AuditLogger::log(
            'lead.status_changed',
            'Lead',
            $lead->id,
            ['status' => $oldStatus],
            ['status' => $status, 'reason' => $reason],
            $actor
        );

        return $lead->fresh(['owner', 'source', 'category']);
    }

    /**
     * Assign or reassign lead to a team member.
     */
    public function assignLead(Lead $lead, ?int $ownerUserId, ?string $note, ?User $actor): Lead
    {
        $oldOwnerId = $lead->owner_user_id;
        $oldOwnerName = $lead->owner?->full_name ?? 'Unassigned';

        $lead->update(['owner_user_id' => $ownerUserId]);
        $newOwner = $ownerUserId ? User::find($ownerUserId) : null;
        $newOwnerName = $newOwner?->full_name ?? 'Unassigned';

        // Log in activity history
        Activity::create([
            'lead_id' => $lead->id,
            'user_id' => $actor?->id,
            'activity_type' => 'assignment',
            'title' => "Lead Assigned to {$newOwnerName}",
            'description' => $note ?: "Reassigned from {$oldOwnerName} to {$newOwnerName}",
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        AuditLogger::log(
            'lead.reassigned',
            'Lead',
            $lead->id,
            ['owner_user_id' => $oldOwnerId],
            ['owner_user_id' => $ownerUserId, 'note' => $note],
            $actor
        );

        return $lead->fresh(['owner', 'source', 'category']);
    }

    /**
     * Atomic 1-Click Lead Conversion: Creates Account, Contact, and Opportunity.
     */
    public function convertLead(Lead $lead, array $options, ?User $actor): array
    {
        return DB::transaction(function () use ($lead, $options, $actor) {
            // 1. Determine Account Category
            $category = ReferenceCategory::find($lead->category_id)
                ?? ReferenceCategory::where('is_active', true)->first();

            // 2. Create Corporate Account
            $account = Account::create([
                'organization_name' => $lead->organization ?: ($lead->name . ' Enterprise'),
                'account_type_id' => $category?->id ?? 1,
                'industry' => $category?->category_name ?? 'Technology',
                'location' => 'Ethiopian IT Park, Addis Ababa',
                'owner_user_id' => $lead->owner_user_id ?? $actor?->id,
                'contact_information' => json_encode([
                    'email' => $lead->email,
                    'phone' => $lead->phone,
                ]),
                'engagement_history' => "Converted from Inbound Lead #{$lead->id} on " . now()->toFormattedDateString(),
            ]);

            // 3. Create Primary Contact Person
            $nameParts = explode(' ', trim($lead->name), 2);
            $firstName = $nameParts[0];
            $lastName = $nameParts[1] ?? 'Representative';

            $contact = Contact::create([
                'account_id' => $account->id,
                'owner_user_id' => $lead->owner_user_id ?? $actor?->id,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'role_title' => $options['contact_title'] ?? 'Primary Contact / Founder',
                'email' => $lead->email,
                'phone' => $lead->phone,
                'is_primary' => true,
            ]);

            // 4. Optionally Create Opportunity / Deal
            $opportunity = null;
            if (!empty($options['create_opportunity'])) {
                $oppType = OpportunityType::first();
                $firstStage = PipelineStage::where('is_active', true)->orderBy('display_order')->first();

                $opportunity = Opportunity::create([
                    'lead_id' => $lead->id,
                    'account_id' => $account->id,
                    'owner_user_id' => $lead->owner_user_id ?? $actor?->id,
                    'opportunity_type_id' => $oppType?->id ?? 1,
                    'stage_id' => $firstStage?->id ?? 1,
                    'value' => $options['estimated_value'] ?? (
                        $lead->estimated_space_sqm ? ($lead->estimated_space_sqm * 350) : 50000.00
                    ),
                    'probability' => 40.00,
                    'expected_close_date' => now()->addMonths(2),
                    'notes' => "Deal originated from converted lead. Space requirement: " . ($lead->estimated_space_sqm ?? 'N/A') . " sqm.",
                    'status' => 'open',
                ]);
            }

            // 5. Update Lead Record with Terminal Status & Converted Links
            $lead->update([
                'status' => Lead::STATUS_CONVERTED,
                'converted_at' => now(),
                'converted_account_id' => $account->id,
                'converted_contact_id' => $contact->id,
                'converted_opportunity_id' => $opportunity?->id,
            ]);

            // 6. Record Activity
            Activity::create([
                'lead_id' => $lead->id,
                'user_id' => $actor?->id,
                'activity_type' => 'conversion',
                'title' => "Lead Converted to Corporate Account",
                'description' => "Generated Account #{$account->id} ({$account->organization_name}) and Contact #{$contact->id}",
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            AuditLogger::log(
                'lead.converted',
                'Lead',
                $lead->id,
                ['status' => 'qualified'],
                [
                    'status' => 'converted',
                    'account_id' => $account->id,
                    'contact_id' => $contact->id,
                    'opportunity_id' => $opportunity?->id,
                ],
                $actor
            );

            return [
                'success' => true,
                'lead' => $lead->fresh(['convertedAccount', 'convertedContact', 'convertedOpportunity']),
                'account' => $account,
                'contact' => $contact,
                'opportunity' => $opportunity,
            ];
        });
    }

    /**
     * Fetch High-Level Funnel Metrics for Leads Dashboard.
     */
    public function getMetrics(?User $user): array
    {
        $base = Lead::query();
        if ($user) {
            $base->visibleTo($user);
        }

        $total = (clone $base)->count();
        $new = (clone $base)->where('status', Lead::STATUS_NEW)->count();
        $contacted = (clone $base)->where('status', Lead::STATUS_CONTACTED)->count();
        $qualified = (clone $base)->where('status', Lead::STATUS_QUALIFIED)->count();
        $converted = (clone $base)->where('status', Lead::STATUS_CONVERTED)->count();
        $unqualified = (clone $base)->where('status', Lead::STATUS_UNQUALIFIED)->count();

        // Count leads in 'new' status older than 48 hours without contact
        $slaBreaches = (clone $base)
            ->where('status', Lead::STATUS_NEW)
            ->where('created_at', '<=', now()->subHours(48))
            ->count();

        // Hot leads (priority urgent or score >= 80)
        $hotLeads = (clone $base)
            ->where(function ($q) {
                $q->where('priority', 'urgent')
                  ->orWhere('lead_score', '>=', 80);
            })
            ->whereNotIn('status', [Lead::STATUS_CONVERTED, Lead::STATUS_UNQUALIFIED])
            ->count();

        $conversionRate = $total > 0 ? round(($converted / $total) * 100, 1) : 0;

        return [
            'total' => $total,
            'new' => $new,
            'contacted' => $contacted,
            'qualified' => $qualified,
            'converted' => $converted,
            'unqualified' => $unqualified,
            'sla_breaches' => $slaBreaches,
            'hot_leads' => $hotLeads,
            'conversion_rate_pct' => $conversionRate,
        ];
    }
}
