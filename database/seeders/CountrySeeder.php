<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Country::factory()->count(10)->create();
//        $countries = [
//            ['name' => 'Country A', 'created_at' => now(), 'updated_at' => now()],
//            ['name' => 'Country B', 'created_at' => now(), 'updated_at' => now()],
//        ];
//
//        DB::table('countries')->insert($countries);
    }
}
