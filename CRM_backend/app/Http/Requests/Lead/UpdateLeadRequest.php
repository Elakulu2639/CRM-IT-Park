<?php

namespace App\Http\Requests\Lead;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'source_id' => 'nullable|exists:lead_sources,id',
            'category_id' => 'nullable|exists:reference_categories,id',
            'owner_user_id' => 'nullable|exists:users,id',
            'status' => 'nullable|in:new,contacted,qualified,unqualified,converted',
            'priority' => 'nullable|in:low,medium,high,urgent',
            'notes' => 'nullable|string',
            'estimated_space_sqm' => 'nullable|numeric|min:0',
            'estimated_headcount' => 'nullable|integer|min:0',
            'next_follow_up_at' => 'nullable|date',
            'force_duplicate' => 'nullable|boolean',
        ];
    }
}
