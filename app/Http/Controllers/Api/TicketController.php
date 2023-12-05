<?php

namespace App\Http\Controllers\Api;

use App\Models\Airport;
use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TicketController
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'price' => 'required|numeric',
            'flight_id' => 'required|exists:flights,id',
        ]);

        return Ticket::query()->create($validatedData);

    }
    public function read($id)
    {
        $ticket = Ticket::query()->find($id);

        if ($ticket == null) {
            return new Response(sprintf('Ticket not found by id [%s]', $id), 404);
        }

        return $ticket;
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'price' => 'numeric',
            'flight_id' => 'exists:flights,id',
        ]);

        $ticket = Ticket::query()->find($id);

        if ( $ticket == null ) {
            return new Response(sprintf('Ticket not found by id %s', $id), 404);
        }

        $ticket->update($validatedData);

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

    public function search(Request $request)
{
    $limit = $request->get('limit', 10);
    $offset = $request->get('offset', 0);
    $tickets= Ticket::query()
        ->offset($offset)
        ->limit($limit)
        ->get();
//
    return $tickets;
}
}
