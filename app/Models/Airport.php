<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    protected $fillable = ['name', 'iata_code', 'city', 'country_id'];

    public function country()
    {
        return $this->belongsTo(Country::class, 'airports_country_id_foreign', 'id');
    }

    use HasFactory;
}
