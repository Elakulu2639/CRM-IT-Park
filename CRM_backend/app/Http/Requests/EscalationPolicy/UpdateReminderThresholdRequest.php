<?php

namespace App\Http\Requests\EscalationPolicy;

use App\Models\EscalationPolicy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateReminderThresholdRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            'reminder_threshold_minutes' => [
                'required',
                'integer',
                'min:1',
            ],
        ];
    }

    /**
     * Cross-field validation to ensure new reminder threshold < current escalation threshold.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            /** @var EscalationPolicy|null $policy */
            $policy = $this->route('escalation_policy');

            $reminderMinutes = (int) $this->input('reminder_threshold_minutes');
            $escalationMinutes = $policy?->escalation_threshold_minutes !== null
                ? (int) $policy->escalation_threshold_minutes
                : null;

            if ($escalationMinutes !== null && $reminderMinutes >= $escalationMinutes) {
                $validator->errors()->add(
                    'reminder_threshold_minutes',
                    "The reminder threshold ({$reminderMinutes} min) must be strictly less than the escalation threshold ({$escalationMinutes} min)."
                );
            }
        });
    }

    public function messages(): array
    {
        return [
            'reminder_threshold_minutes.required' => 'The reminder threshold in minutes is required.',
            'reminder_threshold_minutes.integer' => 'The reminder threshold must be an integer.',
            'reminder_threshold_minutes.min' => 'The reminder threshold must be at least 1 minute.',
        ];
    }
}
