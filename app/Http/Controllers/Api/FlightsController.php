<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FlightsController extends Controller
{

    public function search(Request $request)
    {
        $departureName = $request->get('departure_name');
        $arrivalName = $request->get('arrival_name');
        $flights = Flight::query()
            ->with(['departure', 'arrival', 'departure.country', 'arrival.country'])
            ->departureName($departureName)
            ->arrivalName($arrivalName)
            ->get();

        return $flights;
//
//        return Flight::all();
    }

    public function getTickets($flightId)
    {
        return Ticket::query()
            ->flight($flightId)
            ->get();
    }

    //TODO
    public function create(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'departure_name' => 'required',
            'arrival_name' => 'required',
            // Add more validation rules for other flight attributes if needed
        ]);

        $flight = new Flight();
        $flight->departure_name = $validatedData['departure_name'];
        $flight->arrival_name = $validatedData['arrival_name'];
        // Set other attributes here...

        // Save the new flight
        $flight->save();

        // Optionally, you can return the created flight or a success message
        return ['message' => 'Flight created successfully', 'flight' => $flight];
    }

    //TODO
    public function read($flightId)
    {
        $flight = Flight::query()->find($flightId);

        if ( $flight == null ) {
            return new Response(sprintf('Flight not found by id [%s]', $flightId), 404);
        }

        return $flight;
    }

    //TODO
    public function update(Request $request, $flightId)
    {
        $flight = Flight::query()->find($flightId);

        if ( $flight == null ) {
            return new Response(sprintf('Flight not found by id %s', $flightId), 404);
        }

        $flight->update($request->all());

        return $flight;
    }

    public function delete(Request $request, $flightId)
    {
        $flight = Flight::query()->find($flightId);

        if ( $flight == null ) {
            return new Response(sprintf('Flight not found by id %s', $flightId), 404);
        }

        $flight->delete();

        return $flight;
    }
}
