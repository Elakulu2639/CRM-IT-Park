<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int $event_id
 * @property int $account_id
 * @property int|null $contact_id
 * @property string $registration_status
 * @property string $registered_at
 * @property string|null $attended_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereAttendedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereEventId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereRegisteredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereRegistrationStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EventRegistration whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EventRegistration extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
