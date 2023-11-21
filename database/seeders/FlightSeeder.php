<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departureAirportId = 1;
        $arrivalAirportId = 2;
        $airplaneId = 1;

        $flights = [
            [
                'departure_airport_id' => $departureAirportId,
                'arrival_airport_id' => $arrivalAirportId,
                'airplane_id' => $airplaneId,
                'estimated_departure_time' => now(),
                'estimated_arrival_time' => now()->addHours(3),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more flights as needed
        ];

        DB::table('flights')->insert($flights);
    }
}
