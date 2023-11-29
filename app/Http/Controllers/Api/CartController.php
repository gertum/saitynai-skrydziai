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
      // ShoppingCart::

        $userId = $request->user()->id;
//        $userId= 1;

        $cart = ShoppingCart::where('user_id', $userId)->with('tickets')->first();

        if ($cart) {
            $tickets = $cart->tickets;

            return $tickets;
        } else {
            return redirect()->back()->with('error', 'Cart not found.');
        }

//        return [
//            ['id'=>1423, 'name'=>'Pirmas']
//        ];
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
    public function add(Request $request)
    {

    }

    public function remove(Request $request)
    {

    }
    // Other methods to update or delete items from the cart as needed
}
