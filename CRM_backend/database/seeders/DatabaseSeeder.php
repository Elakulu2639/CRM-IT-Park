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
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
        ]);

        $adminRole = \App\Models\Role::where('role_name', 'System Administrator')->first();

        if ($adminRole) {
            User::firstOrCreate(
                ['email' => 'admin@crm-itpark.com'],
                [
                    'role_id' => $adminRole->id,
                    'first_name' => 'Admin',
                    'last_name' => 'User',
                    'password' => bcrypt('password123'),
                    'status' => 'active',
                ]
            );
        }
    }
}
