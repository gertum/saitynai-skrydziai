<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airport;
use Illuminate\Http\Request;

class AirportsController extends Controller
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
}
