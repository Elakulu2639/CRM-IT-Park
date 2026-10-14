<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService
{
    /**
     * Create a new CRM user with an assigned role.
     */
    public function createUser(array $data): User
    {
        $user = User::create([
            'role_id'    => $data['role_id'],
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'password'   => $data['password'],
            'phone'      => $data['phone'] ?? null,
            'status'     => 'active',
        ]);

        return $user->load('role');
    }

    /**
     * Update mutable profile fields for an existing user.
     */
    public function updateUser(User $user, array $data): User
    {
        $fillable = ['first_name', 'last_name', 'email', 'phone'];

        if (isset($data['password'])) {
            $fillable[] = 'password';
        }

        $user->update(array_intersect_key($data, array_flip($fillable)));

        return $user->load('role');
    }

    /**
     * Activate an inactive user account.
     */
    public function activateUser(User $user): User
    {
        $user->update([
            'status'         => 'active',
            'deactivated_at' => null,
        ]);

        return $user->load('role');
    }

    /**
     * Deactivate a user account.
     *
     * When $reassignToUserId is provided, all records currently owned by the
     * deactivated user are transferred to the target user inside a single DB
     * transaction.  Additional ownership columns should be added to
     * reassignOwnedRecords() as CRM modules are built out.
     *
     * @param  int|null  $reassignToUserId  ID of the user to receive owned records.
     */
    public function deactivateUser(User $user, ?int $reassignToUserId = null): User
    {
        DB::transaction(function () use ($user, $reassignToUserId) {
            if ($reassignToUserId !== null) {
                $this->reassignOwnedRecords($user->id, $reassignToUserId);
            }

            $user->update([
                'status'         => 'inactive',
                'deactivated_at' => now(),
            ]);

            // Revoke all active Sanctum tokens so the session ends immediately.
            $user->tokens()->delete();
        });

        return $user->load('role');
    }

    /**
     * Reassign all records owned by $fromUserId to $toUserId.
     *
     * As new CRM modules (Leads, Opportunities, Tickets, etc.) are implemented
     * and their ownership column is confirmed, add the corresponding update
     * query here so deactivation always leaves data in a consistent state.
     */
    private function reassignOwnedRecords(int $fromUserId, int $toUserId): void
    {
        DB::table('leads')
            ->where('assigned_to', $fromUserId)
            ->update(['assigned_to' => $toUserId]);

        DB::table('opportunities')
            ->where('assigned_to', $fromUserId)
            ->update(['assigned_to' => $toUserId]);

        DB::table('tickets')
            ->where('assigned_to', $fromUserId)
            ->update(['assigned_to' => $toUserId]);
    }

    /**
     * Assign or change the role of a user.
     */
    public function assignRole(User $user, int $roleId): User
    {
        $user->update(['role_id' => $roleId]);

        return $user->load('role');
    }
}
