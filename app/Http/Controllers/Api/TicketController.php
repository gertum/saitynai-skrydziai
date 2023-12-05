<?php

namespace App\Http\Controllers\Api;

use App\Models\Airport;
use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TicketController
{
    //TODO
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'price' => 'required|numeric',
            'flight_id' => 'required|exists:flights,id',
        ]);

        return Ticket::query()->create($validatedData);

    }
    //TODO
    public function read($id)
    {
        $ticket = Ticket::query()->find($id);

        if ($ticket == null) {
            return new Response(sprintf('Ticket not found by id [%s]', $id), 404);
        }

        return $ticket;
    }

    //TODO
    public function update(Request $request, $id)
    {
        $ticket = Ticket::query()->find($id);

        if ( $ticket == null ) {
            return new Response(sprintf('Ticket not found by id %s', $id), 404);
        }

        $ticket->update($request->all());

        return $ticket;
    }

    public function delete(Request $request, $id)
    {
        $ticket = Ticket::query()->find($id);

        if ( $ticket == null ) {
            return new Response(sprintf('Ticket not found by id %s', $id), 404);
        }

        $ticket->delete();

        return $ticket;
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
