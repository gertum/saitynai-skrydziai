<?php

namespace Database\Factories;

use App\Models\Airplane;
use App\Models\Airport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departureAirportId = Airport::inRandomOrder()->value('id');
        $arrivalAirportId = Airport::where('id', '!=', $departureAirportId)->inRandomOrder()->value('id');
        $airplaneId = Airplane::inRandomOrder()->value('id');

        return [
            'departure_airport_id' => $departureAirportId,
            'arrival_airport_id' => $arrivalAirportId,
            'airplane_id' => $airplaneId,
            'estimated_departure_time' => now(),
            'estimated_arrival_time' => now()->addHours(3),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
