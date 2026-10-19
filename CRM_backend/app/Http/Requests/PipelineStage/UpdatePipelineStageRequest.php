<?php

namespace App\Http\Requests\PipelineStage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePipelineStageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is already guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        // The {stage} route parameter gives us the current stage ID so that
        // the unique check ignores the record being updated.
        $stageId = $this->route('stage')?->id;

        return [
            'stage_name'    => [
                'sometimes',
                'required',
                'string',
                'max:100',
                Rule::unique('pipeline_stages', 'stage_name')->ignore($stageId),
            ],
            'display_order' => ['sometimes', 'required', 'integer', 'min:1'],
            'is_closed_won' => ['sometimes', 'boolean'],
            'is_closed_lost'=> ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'stage_name.unique' => 'Another pipeline stage already uses this name.',
        ];
    }
}
