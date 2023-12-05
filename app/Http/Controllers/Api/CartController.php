<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function cart(Request $request)
    {
        $userId = $request->user()->id;

        $cart = ShoppingCart::where('user_id', $userId)->with('tickets')->first();

        if ($cart) {
            $tickets = $cart->tickets;

            return $tickets;
        } else {
            return redirect()->back()->with('error', 'Cart not found.');
        }
    }




    public function add(Request $request)
    {
        $userId = $request->user()->id;

        $cart = ShoppingCart::where('user_id', $userId)->with('tickets')->first();

        $cartId = $cart->id; // Replace this with the actual cart ID (retrieve it from the authenticated user's cart or as needed)

        // Retrieve the ticket ID from the request or any other source
        $ticketId = $request->input('ticket_id');

        // Find the shopping cart instance
        $cart = ShoppingCart::findOrFail($cartId);

        // Attach the ticket to the cart
        $cart->tickets()->attach($ticketId);

        return response()->json(['message' => 'Ticket added to cart']);
    }

    public function remove(Request $request)
    {

    }
    // Other methods to update or delete items from the cart as needed
}
