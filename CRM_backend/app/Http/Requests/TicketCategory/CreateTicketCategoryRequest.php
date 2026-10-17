<?php

namespace App\Http\Requests\TicketCategory;

use Illuminate\Foundation\Http\FormRequest;

class CreateTicketCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is protected by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            'category_name' => ['required', 'string', 'max:100', 'unique:ticket_categories,category_name'],
            'description'   => ['nullable', 'string', 'max:255'],
            'is_active'     => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_name.required' => 'The category name field is required.',
            'category_name.unique'   => 'A ticket category with this name already exists.',
            'category_name.max'      => 'The category name must not exceed 100 characters.',
            'description.max'        => 'The description must not exceed 255 characters.',
        ];
    }
}
