<?php

namespace App\Http\Requests\PipelineStage;

use Illuminate\Foundation\Http\FormRequest;

class TogglePipelineStageStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is already guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            'is_active' => ['required', 'boolean'],
        ];
    }
}
