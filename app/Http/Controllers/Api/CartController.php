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

        return [
            ['id'=>1423, 'name'=>'Pirmas']
        ];
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
