<?php

namespace App\Http\Resources;

use App\Enums\TicketPriority;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EscalationPolicyResource extends JsonResource
{
    /**
     * Transform the escalation policy resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                           => $this->id,
            'priority'                     => $this->priority instanceof TicketPriority ? $this->priority->value : $this->priority,
            'reminder_threshold_minutes'   => (int) $this->reminder_threshold_minutes,
            'escalation_threshold_minutes' => (int) $this->escalation_threshold_minutes,
            'time_basis'                   => $this->time_basis,
            'is_active'                    => (bool) $this->is_active,
            'created_by'                   => $this->whenLoaded('createdByUser', fn () => [
                'id'         => $this->createdByUser->id,
                'name'       => trim(($this->createdByUser->first_name ?? '') . ' ' . ($this->createdByUser->last_name ?? '')),
                'email'      => $this->createdByUser->email,
            ]),
            'created_at'                   => $this->created_at?->toIso8601String(),
            'updated_at'                   => $this->updated_at?->toIso8601String(),
        ];
    }
}
