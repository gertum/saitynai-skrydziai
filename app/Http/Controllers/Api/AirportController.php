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
        $validatedData = $request->validate([
            'name' => 'required|string',
            'iata_code' => 'required|string',
            'city' => 'required|string',
            'country_id' => 'required|numeric',
        ]);

        return Airport::query()->create($validatedData);
    }

    public function read($id)
    {
        $airport = Airport::query()->find($id);

        if ($airport == null) {
            return new Response(sprintf('Airport not found by id [%s]', $id), 404);
        }

        return $airport;
    }

    public function update(Request $request, $id)
    {
        $airport = Airport::query()->find($id);

        if ($airport == null) {
            return new Response(sprintf('Airport not found by id [%s]', $id), 404);
        }

        $airport->update($request->all());

        return $airport;
    }

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

    //TODO
    public function search(Request $request)
    {
//        $departureName = $request->get('departure_name');
//        $arrivalName = $request->get('arrival_name');
//        $limit = $request->get('limit', 10);
//        $offset = $request->get('offset', 0);
//        $flights = Flight::query()
//            ->with(['departure', 'arrival', 'departure.country', 'arrival.country'])
//            ->offset($offset)
//            ->limit($limit)
//            ->departureName($departureName)
//            ->arrivalName($arrivalName)
//            ->get();
//
//        return $flights;
    }
}
