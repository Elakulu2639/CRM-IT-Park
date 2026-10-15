<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int $escalation_policy_id
 * @property int|null $user_id
 * @property int|null $role_id
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereEscalationPolicyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EscalationRecipient whereUserId($value)
 * @mixin \Eloquent
 */
class EscalationRecipient extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
