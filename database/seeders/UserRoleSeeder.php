<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Role;

class UserRoleSeeder extends Seeder
{

    const ROLE_MEMBER = 'member';
    const ROLE_ADMIN = 'admin';

    const ROLES_NAMES = [self::ROLE_MEMBER, self::ROLE_ADMIN];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::ROLES_NAMES as $roleName) {
            try {
                Role::findByName($roleName);
                Log::info(sprintf('role %s already exists', $roleName));
            } catch (RoleDoesNotExist $e) {
                Role::create(['name' => $roleName]);
                Log::info(sprintf('role %s created', $roleName));
            }
        }
    }
}
