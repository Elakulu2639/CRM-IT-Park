<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PipelineStageResource extends JsonResource
{
    /**
     * Transform a PipelineStage model into a clean, typed JSON representation.
     *
     * The `opportunities_count` field is included when the count has been
     * eager-loaded via withCount('opportunities') in the controller — it helps
     * the admin UI show how many active deals are sitting in each stage,
     * which is critical context before deactivating or deleting a stage.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'stage_name'          => $this->stage_name,
            'display_order'       => $this->display_order,
            'is_closed_won'       => $this->is_closed_won,
            'is_closed_lost'      => $this->is_closed_lost,
            'is_active'           => $this->is_active,
            'opportunities_count' => $this->whenCounted('opportunities'),
            'created_at'          => $this->created_at?->toIso8601String(),
            'updated_at'          => $this->updated_at?->toIso8601String(),
        ];
    }
}
