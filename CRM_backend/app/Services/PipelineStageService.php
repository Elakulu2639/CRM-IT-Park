<?php

namespace App\Services;

use App\Models\PipelineStage;
use Illuminate\Support\Facades\DB;

class PipelineStageService
{
    // -------------------------------------------------------------------------
    // Create
    // -------------------------------------------------------------------------

    /**
     * Create a new pipeline stage.
     *
     * If no display_order is provided the new stage is appended after all
     * existing stages (max current order + 1).
     */
    public function createStage(array $data): PipelineStage
    {
        if (empty($data['display_order'])) {
            $data['display_order'] = (PipelineStage::max('display_order') ?? 0) + 1;
        }

        return PipelineStage::create([
            'stage_name'    => $data['stage_name'],
            'display_order' => $data['display_order'],
            'is_closed_won' => $data['is_closed_won'] ?? false,
            'is_closed_lost'=> $data['is_closed_lost'] ?? false,
            'is_active'     => true,
        ]);
    }

    // -------------------------------------------------------------------------
    // Update
    // -------------------------------------------------------------------------

    /**
     * Update mutable fields on an existing stage.
     */
    public function updateStage(PipelineStage $stage, array $data): PipelineStage
    {
        $stage->update(array_filter([
            'stage_name'    => $data['stage_name']    ?? null,
            'display_order' => $data['display_order'] ?? null,
            'is_closed_won' => $data['is_closed_won'] ?? null,
            'is_closed_lost'=> $data['is_closed_lost'] ?? null,
        ], fn ($v) => $v !== null));

        return $stage->fresh();
    }

    // -------------------------------------------------------------------------
    // Activate / Deactivate
    // -------------------------------------------------------------------------

    /**
     * Toggle the active status of a pipeline stage.
     *
     * Deactivating a stage is always safe — existing opportunity records
     * keep their stage_id foreign key intact. The stage simply disappears
     * from active dropdowns for new opportunity transitions.
     */
    public function toggleStatus(PipelineStage $stage, bool $isActive): PipelineStage
    {
        $stage->update(['is_active' => $isActive]);

        return $stage->fresh();
    }

    // -------------------------------------------------------------------------
    // Bulk Reorder
    // -------------------------------------------------------------------------

    /**
     * Bulk-update display_order for multiple stages in one transaction.
     *
     * Accepts an array of [ ['id' => X, 'display_order' => Y], ... ].
     * Runs inside a DB transaction so that either all orders update or none.
     */
    public function reorderStages(array $stages): void
    {
        DB::transaction(function () use ($stages) {
            foreach ($stages as $entry) {
                PipelineStage::where('id', $entry['id'])
                    ->update(['display_order' => $entry['display_order']]);
            }
        });
    }

    // -------------------------------------------------------------------------
    // Delete
    // -------------------------------------------------------------------------

    /**
     * Permanently delete a pipeline stage.
     *
     * A stage may only be deleted when no opportunities currently reference it.
     * If opportunities exist the caller should deactivate the stage instead
     * to preserve historical data integrity.
     *
     * @throws \RuntimeException when the stage has linked opportunities.
     */
    public function deleteStage(PipelineStage $stage): void
    {
        $linkedCount = $stage->opportunities()->count();

        if ($linkedCount > 0) {
            throw new \RuntimeException(
                "Cannot delete \"{$stage->stage_name}\" — it has {$linkedCount} linked " .
                ($linkedCount === 1 ? 'opportunity' : 'opportunities') .
                '. Deactivate the stage instead to preserve historical data.'
            );
        }

        $stage->delete();
    }
}
