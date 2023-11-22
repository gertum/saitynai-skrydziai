<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirplaneSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('airplanes')->insert([
            [
                'seats' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'seats' => 200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

