<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(
            ['role_name' => 'Admin'],
            ['description' => 'System Administrator', 'role_tier' => 1, 'is_active' => true]
        );

        Role::firstOrCreate(
            ['role_name' => 'Manager'],
            ['description' => 'CRM Manager', 'role_tier' => 2, 'is_active' => true]
        );

        Role::firstOrCreate(
            ['role_name' => 'Agent'],
            ['description' => 'Support / CRM Agent', 'role_tier' => 3, 'is_active' => true]
        );

        User::updateOrCreate(
            ['email' => 'admin@itpark.gov.et'],
            [
                'role_id' => $adminRole->id,
                'first_name' => 'System',
                'last_name' => 'Admin',
                'phone' => '+251911000000',
                'password' => 'password',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );
    }
}
