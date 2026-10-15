<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketEscalationHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketEscalationHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketEscalationHistory query()
 * @mixin \Eloquent
 */
class TicketEscalationHistory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
