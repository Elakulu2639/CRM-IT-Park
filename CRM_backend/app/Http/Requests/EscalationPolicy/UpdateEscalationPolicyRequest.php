<?php

namespace App\Http\Requests\EscalationPolicy;

use App\Enums\TicketPriority;
use App\Models\EscalationPolicy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateEscalationPolicyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        /** @var EscalationPolicy|null $policy */
        $policy = $this->route('escalation_policy');
        $policyId = $policy instanceof EscalationPolicy ? $policy->id : $policy;

        return [
            'priority' => [
                'sometimes',
                'required',
                'string',
                Rule::enum(TicketPriority::class),
                Rule::unique('escalation_policies', 'priority')->ignore($policyId),
            ],
            'reminder_threshold_minutes' => [
                'sometimes',
                'required',
                'integer',
                'min:1',
            ],
            'escalation_threshold_minutes' => [
                'sometimes',
                'required',
                'integer',
                'min:2',
            ],
            'time_basis' => [
                'sometimes',
                'string',
                'in:calendar,business_hours',
            ],
            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ];
    }

    /**
     * Cross-field validation to ensure reminder threshold < escalation threshold.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            /** @var EscalationPolicy|null $policy */
            $policy = $this->route('escalation_policy');

            $reminderMinutes = $this->has('reminder_threshold_minutes')
                ? (int) $this->input('reminder_threshold_minutes')
                : ($policy?->reminder_threshold_minutes !== null ? (int) $policy->reminder_threshold_minutes : null);

            $escalationMinutes = $this->has('escalation_threshold_minutes')
                ? (int) $this->input('escalation_threshold_minutes')
                : ($policy?->escalation_threshold_minutes !== null ? (int) $policy->escalation_threshold_minutes : null);

            if ($reminderMinutes !== null && $escalationMinutes !== null) {
                if ($reminderMinutes >= $escalationMinutes) {
                    $validator->errors()->add(
                        'reminder_threshold_minutes',
                        "The reminder threshold ({$reminderMinutes} min) must be strictly less than the escalation threshold ({$escalationMinutes} min)."
                    );
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'priority.unique' => 'Another escalation policy is already configured for this priority.',
            'reminder_threshold_minutes.min' => 'The reminder threshold must be at least 1 minute.',
            'escalation_threshold_minutes.min' => 'The escalation threshold must be at least 2 minutes.',
            'time_basis.in' => 'The time basis must be either calendar or business_hours.',
        ];
    }
}
