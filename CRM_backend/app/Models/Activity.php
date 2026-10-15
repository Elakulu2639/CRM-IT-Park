<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int|null $assigned_user_id
 * @property int|null $lead_id
 * @property int|null $account_id
 * @property int|null $contact_id
 * @property int|null $opportunity_id
 * @property string $activity_type
 * @property string $subject
 * @property string|null $description
 * @property string|null $scheduled_at
 * @property string|null $completed_at
 * @property string|null $reminder_at
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereActivityType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereAssignedUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereOpportunityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereReminderAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Activity whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Activity extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
