<?php

namespace Database\Seeders;

use App\Models\Flight;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve all flights with associated airplanes
        $flights = Flight::with('airplane')->get();

        foreach ($flights as $flight) {
            // Get the airplane associated with the flight
            $airplane = $flight->airplane;

            // Check if airplane exists and has seats
            if ($airplane && $airplane->seats > 0) {
                // Generate tickets based on the number of seats in the airplane
                for ($i = 1; $i <= $airplane->seats; $i++) {
                    DB::table('tickets')->insert([
                        'flight_id' => $flight->id,
                        'price' => 100, // Replace with the actual price for the ticket
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            } else {
                // Log or print information for debugging
                if (!$airplane) {
                    echo "Flight ID {$flight->id} has no associated airplane.\n";
                } else {
                    echo "Flight ID {$flight->id} has an airplane with no seats.\n";
                }
            }
        }
    }
}
