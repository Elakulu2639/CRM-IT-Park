<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\AssignRoleRequest;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\DeactivateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService) {}

    // -------------------------------------------------------------------------
    // User Management
    // -------------------------------------------------------------------------

    /**
     * List all CRM users with their account status and assigned role.
     *
     * Authorized role: System Administrator
     */
    public function index(): AnonymousResourceCollection
    {
        $users = User::with('role')->orderBy('first_name')->get();

        return UserResource::collection($users);
    }

    /**
     * Show a single user's full profile including role.
     *
     * Authorized role: System Administrator
     */
    public function show(User $user): JsonResponse
    {
        $user->load('role');

        return response()->json([
            'success' => true,
            'data'    => ['user' => new UserResource($user)],
        ]);
    }

    /**
     * Create a new CRM user and assign a role.
     *
     * Authorized role: System Administrator
     */
    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User created successfully.',
            'data'    => ['user' => new UserResource($user)],
        ], 201);
    }

    /**
     * Update an existing user's profile information.
     *
     * Authorized role: System Administrator
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user = $this->userService->updateUser($user, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'data'    => ['user' => new UserResource($user)],
        ]);
    }

    /**
     * Activate an inactive user account.
     *
     * Authorized role: System Administrator
     */
    public function activate(User $user): JsonResponse
    {
        if ($user->status === 'active') {
            return response()->json([
                'success' => false,
                'message' => 'User account is already active.',
            ], 422);
        }

        $user = $this->userService->activateUser($user);

        return response()->json([
            'success' => true,
            'message' => 'User account activated successfully.',
            'data'    => ['user' => new UserResource($user)],
        ]);
    }

    /**
     * Deactivate a user account without deleting historical data.
     *
     * Accepts an optional `reassign_to` field: the ID of the active user who
     * should receive all records previously owned by the deactivated user.
     *
     * Authorized role: System Administrator
     */
    public function deactivate(DeactivateUserRequest $request, User $user): JsonResponse
    {
        if ($user->status === 'inactive') {
            return response()->json([
                'success' => false,
                'message' => 'User account is already inactive.',
            ], 422);
        }

        // Prevent an administrator from accidentally deactivating their own account.
        if ($user->id === $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot deactivate your own account.',
            ], 422);
        }

        $reassignToUserId = $request->input('reassign_to');

        // Ensure the reassignment target is not the same user being deactivated.
        if ($reassignToUserId !== null && (int) $reassignToUserId === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'The reassignment target cannot be the same user being deactivated.',
            ], 422);
        }

        $user = $this->userService->deactivateUser($user, $reassignToUserId ? (int) $reassignToUserId : null);

        return response()->json([
            'success' => true,
            'message' => 'User account deactivated successfully.' . ($reassignToUserId ? ' Owned records have been reassigned.' : ''),
            'data'    => ['user' => new UserResource($user)],
        ]);
    }

    // -------------------------------------------------------------------------
    // Role Management
    // -------------------------------------------------------------------------

    /**
     * Assign or change the role of a user.
     *
     * Authorized role: System Administrator
     */
    public function assignRole(AssignRoleRequest $request, User $user): JsonResponse
    {
        $user = $this->userService->assignRole($user, $request->validated('role_id'));

        return response()->json([
            'success' => true,
            'message' => 'Role assigned successfully.',
            'data'    => ['user' => new UserResource($user)],
        ]);
    }
}
