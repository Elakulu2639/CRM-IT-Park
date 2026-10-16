<?php

namespace Database\Seeders;

use App\Models\PipelineStage;
use Illuminate\Database\Seeder;

class PipelineStageSeeder extends Seeder
{
    /**
     * Seed the default sales pipeline stages defined in the SRS.
     *
     * Stages are created idempotently (firstOrCreate) so this seeder
     * is safe to re-run without producing duplicate data.
     * The 'display_order' controls the visual sequence on the pipeline board.
     */
    public function run(): void
    {
        $stages = [
            [
                'stage_name'    => 'New',
                'display_order' => 1,
                'is_closed_won' => false,
                'is_closed_lost'=> false,
                'is_active'     => true,
            ],
            [
                'stage_name'    => 'Contacted',
                'display_order' => 2,
                'is_closed_won' => false,
                'is_closed_lost'=> false,
                'is_active'     => true,
            ],
            [
                'stage_name'    => 'Qualified',
                'display_order' => 3,
                'is_closed_won' => false,
                'is_closed_lost'=> false,
                'is_active'     => true,
            ],
            [
                'stage_name'    => 'Proposal / Negotiation',
                'display_order' => 4,
                'is_closed_won' => false,
                'is_closed_lost'=> false,
                'is_active'     => true,
            ],
            [
                'stage_name'    => 'Closed Won',
                'display_order' => 5,
                'is_closed_won' => true,
                'is_closed_lost'=> false,
                'is_active'     => true,
            ],
            [
                'stage_name'    => 'Closed Lost',
                'display_order' => 6,
                'is_closed_won' => false,
                'is_closed_lost'=> true,
                'is_active'     => true,
            ],
        ];

        foreach ($stages as $stage) {
            PipelineStage::firstOrCreate(
                ['stage_name' => $stage['stage_name']],
                $stage
            );
        }
    }
}
