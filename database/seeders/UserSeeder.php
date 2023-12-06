<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        User::create([
//            'name'=>'Gerda Tumelytė',
//            'email' => 'ger@email.com',
//            'password' => Hash::make('Labas123'),
//        ]);
        /** @var User $admin */
        $admin = User::create([
            'name'=>'Administratorius',
            'email' => 'admin@darbelis.eu',
            'password' => Hash::make('Labas1234'),
        ]);

        $admin->assignRole(UserRoleSeeder::ROLE_ADMIN);


        /** @var User $member */
        $member = User::create([
            'name'=>'Narys',
            'email' => 'member@darbelis.eu',
            'password' => Hash::make('Labas1234'),
        ]);

        $member->assignRole(UserRoleSeeder::ROLE_MEMBER);

    }
}
