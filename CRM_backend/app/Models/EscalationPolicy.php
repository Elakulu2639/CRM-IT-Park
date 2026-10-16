<?php

namespace App\Models;

use App\Enums\TicketPriority;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Represents an escalation policy defining reminder and escalation thresholds per ticket priority.
 *
 * @property int $id
 * @property TicketPriority $priority
 * @property int $reminder_threshold_minutes
 * @property int $escalation_threshold_minutes
 * @property string $time_basis
 * @property bool $is_active
 * @property int $created_by_user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property-read \App\Models\User $createdByUser
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\EscalationRecipient> $recipients
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TicketEscalationHistory> $escalationHistory
 *
 * @method static Builder<static>|EscalationPolicy active()
 * @method static Builder<static>|EscalationPolicy priority(TicketPriority|string $priority)
 * @method static Builder<static>|EscalationPolicy newModelQuery()
 * @method static Builder<static>|EscalationPolicy newQuery()
 * @method static Builder<static>|EscalationPolicy query()
 * @method static Builder<static>|EscalationPolicy whereCreatedAt($value)
 * @method static Builder<static>|EscalationPolicy whereCreatedByUserId($value)
 * @method static Builder<static>|EscalationPolicy whereEscalationThresholdMinutes($value)
 * @method static Builder<static>|EscalationPolicy whereId($value)
 * @method static Builder<static>|EscalationPolicy whereIsActive($value)
 * @method static Builder<static>|EscalationPolicy wherePriority($value)
 * @method static Builder<static>|EscalationPolicy whereReminderThresholdMinutes($value)
 * @method static Builder<static>|EscalationPolicy whereTimeBasis($value)
 * @method static Builder<static>|EscalationPolicy whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EscalationPolicy extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'priority'                     => TicketPriority::class,
            'reminder_threshold_minutes'   => 'integer',
            'escalation_threshold_minutes' => 'integer',
            'is_active'                    => 'boolean',
        ];
    }

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------

    /**
     * User who created/configured this escalation policy.
     */
    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    /**
     * Notification recipients configured for this policy.
     */
    public function recipients(): HasMany
    {
        return $this->hasMany(EscalationRecipient::class, 'escalation_policy_id');
    }

    /**
     * History records of ticket escalations handled under this policy.
     */
    public function escalationHistory(): HasMany
    {
        return $this->hasMany(TicketEscalationHistory::class, 'escalation_policy_id');
    }

    // -------------------------------------------------------------------------
    // Query Scopes
    // -------------------------------------------------------------------------

    /**
     * Scope query to only include active escalation policies.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope query by ticket priority.
     */
    public function scopePriority(Builder $query, TicketPriority|string $priority): Builder
    {
        $value = $priority instanceof TicketPriority ? $priority->value : $priority;
        return $query->where('priority', $value);
    }
}
