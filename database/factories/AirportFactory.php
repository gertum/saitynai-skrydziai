<?php

namespace Database\Factories;

use App\Models\Airport;
use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class AirportFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Airport::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $countries = Country::pluck('id')->toArray();

        return [
            'name' => $this->faker->unique()->words(2, true),
            'iata_code' => $this->faker->unique()->regexify('[A-Z]{3}'),
            'city' => $this->faker->city,
            'country_id' => $this->faker->randomElement($countries),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
