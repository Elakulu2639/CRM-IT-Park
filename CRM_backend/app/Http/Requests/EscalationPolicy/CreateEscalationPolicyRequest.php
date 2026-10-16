<?php

namespace App\Http\Requests\EscalationPolicy;

use App\Enums\TicketPriority;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateEscalationPolicyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route is guarded by auth:sanctum + role:System Administrator
    }

    public function rules(): array
    {
        return [
            'priority' => [
                'required',
                'string',
                Rule::enum(TicketPriority::class),
                'unique:escalation_policies,priority',
            ],
            'reminder_threshold_minutes' => [
                'required',
                'integer',
                'min:1',
                'lt:escalation_threshold_minutes',
            ],
            'escalation_threshold_minutes' => [
                'required',
                'integer',
                'min:2',
                'gt:reminder_threshold_minutes',
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

    public function messages(): array
    {
        return [
            'priority.unique' => 'An escalation policy for this priority already exists. Please update the existing policy instead.',
            'reminder_threshold_minutes.min' => 'The reminder threshold must be at least 1 minute.',
            'reminder_threshold_minutes.lt' => 'The reminder threshold must be strictly less than the escalation threshold.',
            'escalation_threshold_minutes.gt' => 'The escalation threshold must be strictly greater than the reminder threshold.',
            'time_basis.in' => 'The time basis must be either calendar or business_hours.',
        ];
    }
}
