<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'price',
        'flight_id', // Foreign key
        // Add other fillable columns if necessary
    ];

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }
    public function tickets()
    {
        return $this->belongsToMany(Ticket::class)->withTimestamps();
    }

    public function scopeFlight(Builder $builder, $flightId) {
        return $builder->where('flight_id', $flightId);
    }
}
