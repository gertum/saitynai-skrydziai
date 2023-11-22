<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSeatsToAirplanesTable extends Migration
{
    public function up()
    {
        Schema::table('airplanes', function (Blueprint $table) {
            $table->integer('seats')->after('id'); // Modify as needed to position the column
        });
    }

    public function down()
    {
        Schema::table('airplanes', function (Blueprint $table) {
            $table->dropColumn('seats');
        });
    }
}
