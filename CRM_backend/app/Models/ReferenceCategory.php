<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property string $category_group
 * @property string $category_name
 * @property string|null $description
 * @property bool $is_active
 * @property int|null $display_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereCategoryGroup($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereDisplayOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ReferenceCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ReferenceCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

}
