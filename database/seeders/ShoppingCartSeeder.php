<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ShoppingCart;

class ShoppingCartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Retrieve all existing users
        $users = User::all();

        // Create shopping carts for each user
        $users->each(function ($user) {
            $user->shoppingCart()->create(); // Assuming 'shoppingCart()' is the relationship method
        });
    }
}
