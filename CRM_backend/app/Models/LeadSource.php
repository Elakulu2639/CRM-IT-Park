<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $source_name
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource whereSourceName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LeadSource whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LeadSource extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
