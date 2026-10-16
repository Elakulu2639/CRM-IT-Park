<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $category_name
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TicketCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TicketCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
