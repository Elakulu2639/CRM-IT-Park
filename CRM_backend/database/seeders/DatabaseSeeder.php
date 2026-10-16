<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     *
     * Roles are seeded via RoleSeeder, which uses the canonical role names
     * (e.g. "System Administrator") that the CheckRole middleware matches against.
     */
    public function run(): void
    {
        // 1. Seed all four canonical CRM roles first.
        $this->call(RoleSeeder::class);

        // 2. Seed the default SRS pipeline stages (New → Closed Lost).
        $this->call(PipelineStageSeeder::class);

        // 3. Seed the default System Administrator user.
        $adminRole = \App\Models\Role::where('role_name', 'System Administrator')->first();

        User::updateOrCreate(
            ['email' => 'admin@itpark.gov.et'],
            [
                'role_id'            => $adminRole->id,
                'first_name'         => 'System',
                'last_name'          => 'Admin',
                'phone'              => '+251911000000',
                'password'           => 'password',
                'status'             => 'active',
                'email_verified_at'  => now(),
            ]
        );
    }
}
