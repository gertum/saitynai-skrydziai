<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightsController extends Controller
{
    public function search(Request $request)
    {
        $departureName = $request->get('departure_name');
        $arrivalName = $request->get('arrival_name');
        return Flight::query()
            ->with(['departure', 'arrival', 'departure.country', 'arrival.country'])
            ->departureName($departureName)
            ->arrivalName($arrivalName)
            ->get();
//
//        return Flight::all();
    }
}
