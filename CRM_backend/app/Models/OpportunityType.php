<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $type_name
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType whereTypeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OpportunityType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OpportunityType extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
