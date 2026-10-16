<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int $calendar_id
 * @property string $holiday_date
 * @property string $holiday_name
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday whereCalendarId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday whereHolidayDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday whereHolidayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BusinessHoliday whereId($value)
 * @mixin \Eloquent
 */
class BusinessHoliday extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

}
