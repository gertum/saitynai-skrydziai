<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameCartTicketsTable extends Migration
{
    public function up()
    {
        Schema::rename('cart_tickets', 'shopping_cart_ticket');
    }

    public function down()
    {
        Schema::rename('shopping_cart_ticket', 'cart_tickets');
    }
}
