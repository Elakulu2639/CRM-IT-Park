<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EscalationPolicy\CreateEscalationPolicyRequest;
use App\Http\Requests\EscalationPolicy\ToggleEscalationPolicyStatusRequest;
use App\Http\Requests\EscalationPolicy\UpdateEscalationPolicyRequest;
use App\Http\Requests\EscalationPolicy\UpdateReminderThresholdRequest;
use App\Http\Resources\EscalationPolicyResource;
use App\Models\EscalationPolicy;
use App\Services\EscalationPolicyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EscalationPolicyController extends Controller
{
    public function __construct(
        private readonly EscalationPolicyService $service
    ) {}

    /**
     * List all escalation policies and reminder threshold configurations.
     *
     * Authorized role: System Administrator
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $policies = $this->service->getAllPolicies($request->query());

        return EscalationPolicyResource::collection($policies);
    }

    /**
     * Create / configure a new escalation policy and reminder threshold.
     *
     * Authorized role: System Administrator
     */
    public function store(CreateEscalationPolicyRequest $request): JsonResponse
    {
        $policy = $this->service->createPolicy(
            $request->validated(),
            $request->user()->id
        );

        $priorityName = $policy->priority->value;

        return response()->json([
            'success' => true,
            'message' => "Escalation policy for priority \"{$priorityName}\" created successfully.",
            'data'    => [
                'policy' => new EscalationPolicyResource($policy),
            ],
        ], 201);
    }

    /**
     * View details of a specific escalation policy and its reminder threshold.
     *
     * Authorized role: System Administrator
     */
    public function show(EscalationPolicy $escalation_policy): JsonResponse
    {
        $escalation_policy->load('createdByUser');

        return response()->json([
            'success' => true,
            'data'    => [
                'policy' => new EscalationPolicyResource($escalation_policy),
            ],
        ]);
    }

    /**
     * Update an escalation policy configuration.
     *
     * Authorized role: System Administrator
     */
    public function update(UpdateEscalationPolicyRequest $request, EscalationPolicy $escalation_policy): JsonResponse
    {
        $policy = $this->service->updatePolicy($escalation_policy, $request->validated());
        $priorityName = $policy->priority->value;

        return response()->json([
            'success' => true,
            'message' => "Escalation policy for priority \"{$priorityName}\" updated successfully.",
            'data'    => [
                'policy' => new EscalationPolicyResource($policy),
            ],
        ]);
    }

    /**
     * Update the reminder threshold specifically for a ticket priority.
     *
     * Authorized role: System Administrator
     */
    public function updateReminderThreshold(
        UpdateReminderThresholdRequest $request,
        EscalationPolicy $escalation_policy
    ): JsonResponse {
        $policy = $this->service->updateReminderThreshold(
            $escalation_policy,
            (int) $request->validated('reminder_threshold_minutes')
        );

        $priorityName = $policy->priority->value;

        return response()->json([
            'success' => true,
            'message' => "Reminder threshold for priority \"{$priorityName}\" updated to {$policy->reminder_threshold_minutes} minutes.",
            'data'    => [
                'policy' => new EscalationPolicyResource($policy),
            ],
        ]);
    }

    /**
     * Activate or deactivate an escalation policy.
     *
     * Authorized role: System Administrator
     */
    public function toggleStatus(
        ToggleEscalationPolicyStatusRequest $request,
        EscalationPolicy $escalation_policy
    ): JsonResponse {
        $isActive = $request->boolean('is_active');

        if ($escalation_policy->is_active === $isActive) {
            $state = $isActive ? 'active' : 'inactive';
            return response()->json([
                'success' => false,
                'message' => "Escalation policy for priority \"{$escalation_policy->priority->value}\" is already {$state}.",
            ], 422);
        }

        $policy = $this->service->toggleStatus($escalation_policy, $isActive);
        $state = $isActive ? 'activated' : 'deactivated';

        return response()->json([
            'success' => true,
            'message' => "Escalation policy for priority \"{$policy->priority->value}\" {$state} successfully.",
            'data'    => [
                'policy' => new EscalationPolicyResource($policy),
            ],
        ]);
    }

    /**
     * Delete an escalation policy configuration.
     *
     * Authorized role: System Administrator
     */
    public function destroy(EscalationPolicy $escalation_policy): JsonResponse
    {
        try {
            $priorityName = $escalation_policy->priority->value;
            $this->service->deletePolicy($escalation_policy);

            return response()->json([
                'success' => true,
                'message' => "Escalation policy for priority \"{$priorityName}\" deleted successfully.",
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}
