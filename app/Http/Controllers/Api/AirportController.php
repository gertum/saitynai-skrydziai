<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Airport;
use App\Models\Flight;
use App\Models\Ticket;
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
    public function read($id)
    {
        $airport = Airport::query()->find($id);

        if ($airport == null) {
            return new Response(sprintf('Airport not found by id [%s]', $id), 404);
        }

        return $airport;
    }

    //TODO
    public function update(Request $request, $id)
    {
        $airport = Airport::query()->find($id);

        if ($airport == null) {
            return new Response(sprintf('Airport not found by id [%s]', $id), 404);
        }

        $airport->update($request->all());

        return $airport;
    }

    //TODO
    public function delete(Request $request, $id)
    {
        $airport = Airport::query()->find($id);

        if ($airport == null) {
            return new Response(sprintf('Airport not found by id [%s]', $id), 404);
        }

        $flightsDeparturing = Flight::query()->where('departure_airport_id', $id)->get();
        $flightsArriving = Flight::query()->where('arrival_airport_id', $id)->get();

        $fligthsKeys = $flightsDeparturing->merge($flightsArriving)->map(fn(Flight $f)=>$f->getKey());

        Ticket::query()->whereIn('flight_id', $fligthsKeys)->delete();
        Flight::query()->whereIn('id', $fligthsKeys)->delete();

        $airport->delete();

        return $airport;
    }
}
