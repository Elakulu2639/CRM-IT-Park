<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Represents a configurable stage in the sales pipeline.
 *
 * @property int    $id
 * @property string $stage_name
 * @property int    $display_order
 * @property bool   $is_closed_won
 * @property bool   $is_closed_lost
 * @property bool   $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static Builder<static>|PipelineStage active()
 * @method static Builder<static>|PipelineStage ordered()
 * @method static Builder<static>|PipelineStage newModelQuery()
 * @method static Builder<static>|PipelineStage newQuery()
 * @method static Builder<static>|PipelineStage query()
 * @method static Builder<static>|PipelineStage whereCreatedAt($value)
 * @method static Builder<static>|PipelineStage whereDisplayOrder($value)
 * @method static Builder<static>|PipelineStage whereId($value)
 * @method static Builder<static>|PipelineStage whereIsActive($value)
 * @method static Builder<static>|PipelineStage whereIsClosedLost($value)
 * @method static Builder<static>|PipelineStage whereIsClosedWon($value)
 * @method static Builder<static>|PipelineStage whereStageName($value)
 * @method static Builder<static>|PipelineStage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PipelineStage extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Automatically cast database columns to their proper PHP types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'display_order'  => 'integer',
        'is_closed_won'  => 'boolean',
        'is_closed_lost' => 'boolean',
        'is_active'      => 'boolean',
    ];

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------

    /**
     * Opportunities currently sitting in this stage.
     */
    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class, 'stage_id');
    }

    /**
     * All stage-transition history entries that targeted or originated from
     * this stage (as the destination).
     */
    public function stageHistories(): HasMany
    {
        return $this->hasMany(OpportunityStageHistory::class, 'to_stage_id');
    }

    // -------------------------------------------------------------------------
    // Query Scopes
    // -------------------------------------------------------------------------

    /**
     * Filter to only active (enabled) stages.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Order stages by their configured display order (ascending).
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('display_order');
    }
}

