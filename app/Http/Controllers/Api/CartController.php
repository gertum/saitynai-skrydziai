<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show()
    {
        // Get the authenticated user
        $user = auth()->user();

        // Retrieve the shopping cart for the user
        $shoppingCart = $user->shoppingCart;

        // Check if the user has a shopping cart
        if ($shoppingCart) {
            // Load tickets associated with the shopping cart
            $tickets = $shoppingCart->tickets;

            // Pass the shopping cart and tickets data to the view
            return view('cart.show', compact('user', 'tickets'));
        }

        // If the user doesn't have a shopping cart, handle accordingly
        return redirect()->route('welcome')->with('error', 'No shopping cart found for this user.');
    }




    public function store(Request $request)
    {
        // Logic to add an item to the cart
        // For example:
        // $item = new CartItem();
        // $item->name = $request->input('name');
        // $item->price = $request->input('price');
        // $item->save();

        // Return the updated cart or a success response
        return response()->json(['message' => 'Item added to cart']);
    }

    // Other methods to update or delete items from the cart as needed
}
