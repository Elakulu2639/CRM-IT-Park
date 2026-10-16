<?php

namespace App\Services;

use App\Enums\TicketPriority;
use App\Models\EscalationPolicy;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EscalationPolicyService
{
    /**
     * Retrieve all escalation policies matching the optional filters.
     *
     * @param array<string, mixed> $filters
     * @return Collection<int, EscalationPolicy>
     */
    public function getAllPolicies(array $filters = []): Collection
    {
        $query = EscalationPolicy::with('createdByUser');

        if (!empty($filters['priority'])) {
            $query->priority($filters['priority']);
        }

        if (isset($filters['active_only']) && filter_var($filters['active_only'], FILTER_VALIDATE_BOOLEAN)) {
            $query->active();
        } elseif (isset($filters['is_active'])) {
            $query->where('is_active', filter_var($filters['is_active'], FILTER_VALIDATE_BOOLEAN));
        }

        return $query->orderBy('id', 'asc')->get();
    }

    /**
     * Find a single policy by ID.
     */
    public function getPolicyById(int $id): EscalationPolicy
    {
        return EscalationPolicy::with('createdByUser')->findOrFail($id);
    }

    /**
     * Find a policy by priority enum or value.
     */
    public function getPolicyByPriority(TicketPriority|string $priority): ?EscalationPolicy
    {
        return EscalationPolicy::with('createdByUser')->priority($priority)->first();
    }

    /**
     * Create a new escalation policy record.
     *
     * @param array<string, mixed> $data
     */
    public function createPolicy(array $data, int $userId): EscalationPolicy
    {
        return DB::transaction(function () use ($data, $userId) {
            $policy = EscalationPolicy::create([
                'priority'                     => $data['priority'],
                'reminder_threshold_minutes'   => (int) $data['reminder_threshold_minutes'],
                'escalation_threshold_minutes' => (int) $data['escalation_threshold_minutes'],
                'time_basis'                   => $data['time_basis'] ?? 'calendar',
                'is_active'                    => $data['is_active'] ?? true,
                'created_by_user_id'           => $userId,
            ]);

            return $policy->load('createdByUser');
        });
    }

    /**
     * Update configuration on an existing escalation policy.
     *
     * @param array<string, mixed> $data
     */
    public function updatePolicy(EscalationPolicy $policy, array $data): EscalationPolicy
    {
        $fillable = array_filter([
            'priority'                     => $data['priority'] ?? null,
            'reminder_threshold_minutes'   => isset($data['reminder_threshold_minutes']) ? (int) $data['reminder_threshold_minutes'] : null,
            'escalation_threshold_minutes' => isset($data['escalation_threshold_minutes']) ? (int) $data['escalation_threshold_minutes'] : null,
            'time_basis'                   => $data['time_basis'] ?? null,
            'is_active'                    => isset($data['is_active']) ? (bool) $data['is_active'] : null,
        ], fn ($value) => $value !== null);

        $policy->update($fillable);

        return $policy->fresh()->load('createdByUser');
    }

    /**
     * Update the reminder threshold specifically on an escalation policy.
     */
    public function updateReminderThreshold(EscalationPolicy $policy, int $reminderMinutes): EscalationPolicy
    {
        $policy->update([
            'reminder_threshold_minutes' => $reminderMinutes,
        ]);

        return $policy->fresh()->load('createdByUser');
    }

    /**
     * Activate or deactivate an escalation policy.
     */
    public function toggleStatus(EscalationPolicy $policy, bool $isActive): EscalationPolicy
    {
        $policy->update([
            'is_active' => $isActive,
        ]);

        return $policy->fresh()->load('createdByUser');
    }

    /**
     * Delete an escalation policy.
     */
    public function deletePolicy(EscalationPolicy $policy): void
    {
        // Block deletion if linked to escalation history
        if ($policy->escalationHistory()->exists()) {
            throw new \RuntimeException(
                "Cannot delete escalation policy for priority \"{$policy->priority->value}\" because tickets have history logged against it. Deactivate it instead."
            );
        }

        $policy->delete();
    }
}
