<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airport;
use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AirportController extends Controller
{
    public function getAirportById(Request $request)
    {
        $airportId = $request->route('id'); // Accessing the parameter from the route
        $airport = Airport::find($airportId);
//        $airport = Airport::with('country')->find($airportId);
        if (!$airport) {
            return response()->json(['message' => 'Airport not found'], 404);
        }

        return response()->json($airport);
    }

    //TODO
    public function create(Request $request)
    {

    }

    //TODO
    public function read($flightId)
    {

    }

    //TODO
    public function update(Request $request, $flightId)
    {

    }

    //TODO
    public function delete(Request $request, $flightId)
    {

    }
}
