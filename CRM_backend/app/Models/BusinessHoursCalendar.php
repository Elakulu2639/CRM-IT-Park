<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $calendar_name
 * @property string|null $timezone
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar whereCalendarName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar whereTimezone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoursCalendar whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BusinessHoursCalendar extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
