<?php

namespace App\Http\Requests\Lead;

use Illuminate\Foundation\Http\FormRequest;

class ConvertLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'contact_title' => 'nullable|string|max:150',
            'create_opportunity' => 'nullable|boolean',
            'opportunity_title' => 'nullable|string|max:255',
            'estimated_value' => 'nullable|numeric|min:0',
        ];
    }
}
