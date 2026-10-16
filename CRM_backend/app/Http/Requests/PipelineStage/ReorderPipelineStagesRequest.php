<?php

namespace App\Http\Requests\PipelineStage;

use Illuminate\Foundation\Http\FormRequest;

class ReorderPipelineStagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is already guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            // 'stages' must be a non-empty array of ordering entries.
            'stages'               => ['required', 'array', 'min:1'],
            'stages.*.id'          => ['required', 'integer', 'exists:pipeline_stages,id'],
            'stages.*.display_order'=> ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'stages.required'            => 'A list of stages with their new order is required.',
            'stages.*.id.exists'         => 'One or more stage IDs do not exist in the system.',
            'stages.*.display_order.min' => 'Display order must be 1 or greater.',
        ];
    }
}
