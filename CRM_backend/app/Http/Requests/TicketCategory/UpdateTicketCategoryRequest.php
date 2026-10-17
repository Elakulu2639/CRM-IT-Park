<?php

namespace App\Http\Requests\TicketCategory;

use App\Models\TicketCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is protected by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        $category = $this->route('ticket_category');
        $categoryId = $category instanceof TicketCategory ? $category->id : $category;

        return [
            'category_name' => [
                'sometimes',
                'required',
                'string',
                'max:100',
                Rule::unique('ticket_categories', 'category_name')->ignore($categoryId),
            ],
            'description' => ['nullable', 'string', 'max:255'],
            'is_active'   => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_name.unique' => 'Another ticket category already uses this name.',
            'category_name.max'    => 'The category name must not exceed 100 characters.',
            'description.max'      => 'The description must not exceed 255 characters.',
        ];
    }
}
