<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int|null $account_id
 * @property int|null $contact_id
 * @property int|null $lead_id
 * @property int|null $opportunity_id
 * @property int|null $activity_id
 * @property int $created_by_user_id
 * @property string $communication_type
 * @property string|null $subject
 * @property string|null $content
 * @property string $communication_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereActivityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereCommunicationAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereCommunicationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereCreatedByUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereOpportunityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Communication whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Communication extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
