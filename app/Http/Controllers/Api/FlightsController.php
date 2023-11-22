<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightsController extends Controller
{
    public function search(Request $request)
    {
        $departure_id = $request->get('departure_id');
        return Flight::query()
            ->departureId($departure_id)
            ->get();
//
//        return Flight::all();
    }
}
