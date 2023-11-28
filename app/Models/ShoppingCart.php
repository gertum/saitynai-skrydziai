<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tickets()
    {
        return $this->belongsToMany(Ticket::class)
            ->withPivot('shopping_cart_id', 'ticket_id', 'created_at', 'updated_at')
//            ->with(Flight::)
            ->withTimestamps();
    }
}
