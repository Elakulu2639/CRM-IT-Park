<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $stage_name
 * @property int $display_order
 * @property bool $is_closed_won
 * @property bool $is_closed_lost
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereDisplayOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereIsClosedLost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereIsClosedWon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereStageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PipelineStage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PipelineStage extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
