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
        $user = auth()->user();

        if (!$user) {
            // If the user is not authenticated, handle accordingly
            return redirect()->route('login')->with('error', 'Please log in to view your cart.');
        }

        $shoppingCart = $user->shoppingCart;

        if ($shoppingCart) {

            $tickets = $shoppingCart->tickets;

            // Display the cart and associated tickets
            return view('cart.show', compact('user', 'tickets'));
        }

        // Redirect to welcome page if no shopping cart exists for the user
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
