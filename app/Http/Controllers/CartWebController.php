<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CartWebController
{
    public function index()
    {
        return Inertia::render('ShoppingCart');
    }
}
