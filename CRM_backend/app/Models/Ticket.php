<?php

namespace App\Models;

use App\Enums\TicketPriority;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


    /**
 * @property int $id
 * @property int|null $account_id
 * @property int|null $contact_id
 * @property int|null $assignee_user_id
 * @property int $category_id
 * @property TicketPriority $priority
 * @property string $status
 * @property string $subject
 * @property string|null $description
 * @property string $last_activity_at
 * @property int|null $inactivity_duration_seconds
 * @property bool $escalated
 * @property string|null $escalated_at
 * @property string|null $closed_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereAssigneeUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereClosedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereEscalated($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereEscalatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereInactivityDurationSeconds($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereLastActivityAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ticket withoutTrashed()
 * @mixin \Eloquent
 */
class Ticket extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'priority' => TicketPriority::class,
        ];
    }
}
