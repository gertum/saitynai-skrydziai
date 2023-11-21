<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('departure_airport_id');
            $table->unsignedBigInteger('arrival_airport_id');
            $table->unsignedBigInteger('airplane_id');
            $table->dateTime('estimated_departure_time');
            $table->dateTime('estimated_arrival_time');
            $table->dateTime('real_departure_time')->nullable();
            $table->dateTime('real_arrival_time')->nullable();

            $table->timestamps();

            $table->foreign('departure_airport_id')->references('id')->on('airports');
            $table->foreign('arrival_airport_id')->references('id')->on('airports');
            $table->foreign('airplane_id')->references('id')->on('airplanes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
