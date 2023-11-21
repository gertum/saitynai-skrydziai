<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = [
        'departure_airport_id',
        'arrival_airport_id',
        'airplane_id',
        'estimated_departure_time',
        'estimated_arrival_time',
        'real_departure_time',
        'real_arrival_time',
    ];

    use HasFactory;
}
