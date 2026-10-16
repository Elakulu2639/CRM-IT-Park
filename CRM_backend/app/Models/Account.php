<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


    /**
 * @property int $id
 * @property int|null $owner_user_id
 * @property string $organization_name
 * @property int $account_type_id
 * @property string|null $industry
 * @property string|null $location
 * @property string|null $contact_information
 * @property string|null $engagement_history
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereAccountTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereContactInformation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereEngagementHistory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereIndustry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereOrganizationName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereOwnerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Account withoutTrashed()
 * @mixin \Eloquent
 */
class Account extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = ['id'];

}
