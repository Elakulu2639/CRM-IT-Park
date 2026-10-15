<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int $calendar_id
 * @property int $day_of_week
 * @property string|null $start_time
 * @property string|null $end_time
 * @property bool $is_working_day
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereCalendarId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereDayOfWeek($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereIsWorkingDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHour whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BusinessHour extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
