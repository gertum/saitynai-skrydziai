<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $airports = [
            [
                'name' => 'Airport A',
                'iata_code' => 'ABC',
                'city' => 'City A',
                'country_id' => 1, // Replace with the actual country_id from your countries table
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Airport B',
                'iata_code' => 'DEF',
                'city' => 'City B',
                'country_id' => 2, // Replace with the actual country_id from your countries table
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more airports as needed
        ];

        DB::table('airports')->insert($airports);
    }
}
