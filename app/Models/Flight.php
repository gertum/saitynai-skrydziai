<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function airplane()
    {
        return $this->belongsTo(Airplane::class, 'airplane_id');
    }

    use HasFactory;

    // example only

    /**
     * @param $builder
     * @param $departureId
     * @return mixed
     * @deprecated unused
     */
    public function scopeDepartureId($builder, $departureId)
    {
        if (empty($departureId)) {
            return $builder;
        }
        return $builder->where('departure_airport_id', '=', $departureId);
    }

    public function departure(): BelongsTo
    {
        return $this->belongsTo(Airport::class, 'departure_airport_id');
    }

    public function arrival(): BelongsTo
    {
        return $this->belongsTo(Airport::class, 'arrival_airport_id');
    }

    public function scopeDepartureName(Builder $builder, $departureName)
    {
        if (empty($departureName)) {
            return $builder;
        }


        return $builder->whereHas('departure', function ($q) use ($departureName) {
            $q->where('name', 'like', sprintf('%%%s%%', $departureName));
        });
    }

    public function scopeArrivalName(Builder $builder, $arrivalName)
    {
        if (empty($arrivalName)) {
            return $builder;
        }


        return $builder->whereHas('arrival', function ($q) use ($arrivalName) {
            $q->where('name', 'like', sprintf('%%%s%%', $arrivalName));
        });
    }

}
