<?php

namespace App\Http\Requests\EscalationPolicy;

use Illuminate\Foundation\Http\FormRequest;

class ToggleEscalationPolicyStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            'is_active' => ['required', 'boolean'],
        ];
    }
}
