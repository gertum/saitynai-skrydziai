<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use App\Models\Ticket;
use App\Models\User;
use Database\Seeders\UserRoleSeeder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Exceptions\UnauthorizedException;

class FlightController extends Controller
{

    public function search(Request $request)
    {
        $departureName = $request->get('departure_name');
        $arrivalName = $request->get('arrival_name');
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);
        $flights = Flight::query()
            ->with(['departure', 'arrival', 'departure.country', 'arrival.country'])
            ->offset($offset)
            ->limit($limit)
            ->departureName($departureName)
            ->arrivalName($arrivalName)
            ->get();

        return $flights;
    }

    public function getTickets($flightId)
    {
        return Ticket::query()
            ->flight($flightId)
            ->get();
    }

    public function create(Request $request)
    {
        /** @var User $user */
        $user = auth()->user();

        if (!$user->hasRole(UserRoleSeeder::ROLE_ADMIN)) {
            throw new UnauthorizedException(401, 'Admin role needed');
        }

        $validatedData = $request->validate([
            'real_departure_time' => 'date',
            'real_arrival_time' => 'date',
            'estimated_departure_time' => 'required|date',
            'estimated_arrival_time' => 'required|date',
            'airplane_id' => 'required|numeric',
            'arrival_airport_id' => 'required|numeric',
            'departure_airport_id' => 'required|numeric',
        ]);


        return Flight::query()->create($validatedData);

    }

    public function read($flightId)
    {
        $flight = Flight::query()->find($flightId);

        if ( $flight == null ) {
            return new Response(sprintf('Flight not found by id [%s]', $flightId), 404);
        }

        return $flight;
    }

    public function update(Request $request, $flightId)
    {
        /** @var User $user */
        $user = auth()->user();

        if (!$user->hasRole(UserRoleSeeder::ROLE_ADMIN)) {
            throw new UnauthorizedException(401, 'Admin role needed');
        }

        $flight = Flight::query()->find($flightId);

        if ( $flight == null ) {
            return new Response(sprintf('Flight not found by id %s', $flightId), 404);
        }

        $validatedData = $request->validate([
            'real_departure_time' => 'date',
            'real_arrival_time' => 'date',
            'estimated_departure_time' => 'date',
            'estimated_arrival_time' => 'date',
            'airplane_id' => 'numeric',
            'arrival_airport_id' => 'numeric',
            'departure_airport_id' => 'numeric',
        ]);

        $flight->update($validatedData);

        return $flight;
    }

    public function delete(Request $request, $flightId)
    {
        /** @var User $user */
        $user = auth()->user();

        if (!$user->hasRole(UserRoleSeeder::ROLE_ADMIN)) {
            throw new UnauthorizedException(401, 'Admin role needed');
        }

        $flight = Flight::query()->find($flightId);

        if ( $flight == null ) {
            return new Response(sprintf('Flight not found by id %s', $flightId), 404);
        }


        $tickets = Ticket::query()->where('flight_id', $flightId)->delete();

        $flight->delete();

        return $flight;
    }
}
