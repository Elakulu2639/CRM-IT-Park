<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


    /**
 * @property int $id
 * @property int|null $lead_id
 * @property int $account_id
 * @property int|null $owner_user_id
 * @property int $opportunity_type_id
 * @property int $stage_id
 * @property numeric|null $probability
 * @property numeric|null $value
 * @property string|null $expected_close_date
 * @property string|null $notes
 * @property string $status
 * @property string|null $closed_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereClosedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereExpectedCloseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereOpportunityTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereOwnerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereProbability($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereStageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Opportunity withoutTrashed()
 * @mixin \Eloquent
 */
class Opportunity extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = ['id'];

}
