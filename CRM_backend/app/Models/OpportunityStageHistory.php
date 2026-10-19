<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityStageHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityStageHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityStageHistory query()
 * @mixin \Eloquent
 */
class OpportunityStageHistory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

}
