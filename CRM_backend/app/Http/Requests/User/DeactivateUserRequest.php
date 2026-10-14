<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class DeactivateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            /**
             * Optional: the ID of the user who should receive all records
             * currently owned by the user being deactivated.
             * Must be an active user who is not the same as the user being deactivated.
             */
            'reassign_to' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
        ];
    }
}
