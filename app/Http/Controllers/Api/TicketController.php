<?php

namespace App\Http\Controllers\Api;

use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TicketController
{
    //TODO
    public function create(Request $request)
    {
//        // Validate the incoming request data
//        $validatedData = $request->validate([
//            'departure_name' => 'required',
//            'arrival_name' => 'required',
//            // Add more validation rules for other flight attributes if needed
//        ]);

        $ticket = new Ticket();
//        $flight->departure_name = $validatedData['departure_name'];
//        $flight->arrival_name = $validatedData['arrival_name'];
        // Set other attributes here...

        // Save the new flight
        $ticket->save();

        // Optionally, you can return the created flight or a success message
        return ['message' => 'Ticket created successfully', 'ticket' => $ticket];
    }

    //TODO
    public function read($flightId)
    {

    }

    //TODO
    public function update(Request $request, $flightId)
    {

    }

    public function delete(Request $request, $flightId)
    {

    }
}
