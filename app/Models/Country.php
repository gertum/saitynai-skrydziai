<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = ['name'];

//    public function airports()
//    {
//        return $this->hasMany(Airport::class);
//    }

    public function airports()
    {
        return $this->hasMany(Airport::class, 'airports_country_id_foreign', 'id');
    }

    use HasFactory;
}
