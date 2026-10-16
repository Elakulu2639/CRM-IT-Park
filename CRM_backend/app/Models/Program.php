<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $program_name
 * @property string $program_type
 * @property string|null $description
 * @property string|null $start_date
 * @property string|null $end_date
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereProgramName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereProgramType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Program whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Program extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
