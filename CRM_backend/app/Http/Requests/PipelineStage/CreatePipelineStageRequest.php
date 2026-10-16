<?php

namespace App\Http\Requests\PipelineStage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreatePipelineStageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is already guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            'stage_name'    => ['required', 'string', 'max:100', 'unique:pipeline_stages,stage_name'],
            'display_order' => ['required', 'integer', 'min:1'],
            'is_closed_won' => ['boolean'],
            'is_closed_lost'=> ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'stage_name.unique' => 'A pipeline stage with this name already exists.',
        ];
    }
}
