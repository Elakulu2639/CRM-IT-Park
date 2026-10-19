<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int $program_id
 * @property int $account_id
 * @property int|null $contact_id
 * @property int|null $opportunity_id
 * @property string $application_date
 * @property string $status
 * @property string|null $progress_notes
 * @property string|null $engagement_notes
 * @property string|null $completed_at
 * @property string|null $withdrawn_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereApplicationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereEngagementNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereOpportunityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereProgressNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProgramApplication whereWithdrawnAt($value)
 * @mixin \Eloquent
 */
class ProgramApplication extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
