<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        return [
            'role_id'    => ['sometimes', 'integer', 'exists:roles,id'],
            'first_name' => ['sometimes', 'string', 'max:100'],
            'last_name'  => ['sometimes', 'string', 'max:100'],
            'email'      => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'password'   => ['sometimes', 'string', 'min:8', 'confirmed'],
            'phone'      => ['sometimes', 'nullable', 'string', 'max:50'],
            'status'     => ['sometimes', 'string', Rule::in(['active', 'inactive'])],
        ];
    }
}
