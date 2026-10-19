<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Represents a configurable category for support tickets.
 *
 * @property int $id
 * @property string $category_name
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Ticket> $tickets
 * @property-read int|null $tickets_count
 *
 * @method static Builder<static>|TicketCategory active()
 * @method static Builder<static>|TicketCategory newModelQuery()
 * @method static Builder<static>|TicketCategory newQuery()
 * @method static Builder<static>|TicketCategory query()
 * @method static Builder<static>|TicketCategory whereCategoryName($value)
 * @method static Builder<static>|TicketCategory whereCreatedAt($value)
 * @method static Builder<static>|TicketCategory whereDescription($value)
 * @method static Builder<static>|TicketCategory whereId($value)
 * @method static Builder<static>|TicketCategory whereIsActive($value)
 * @method static Builder<static>|TicketCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TicketCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------

    /**
     * Tickets associated with this category.
     */
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'category_id');
    }

    // -------------------------------------------------------------------------
    // Scopes
    // -------------------------------------------------------------------------

    /**
     * Scope query to only include active ticket categories.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
