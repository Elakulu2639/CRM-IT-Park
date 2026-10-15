<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $priority
 * @property int $reminder_threshold_minutes
 * @property int $escalation_threshold_minutes
 * @property string $time_basis
 * @property bool $is_active
 * @property int $created_by_user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereCreatedByUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereEscalationThresholdMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereReminderThresholdMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereTimeBasis($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationPolicy whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EscalationPolicy extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
