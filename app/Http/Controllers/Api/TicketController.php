<?php

namespace App\Http\Controllers\Api;

use App\Models\Ticket;
use App\Models\User;
use Database\Seeders\UserRoleSeeder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Exceptions\UnauthorizedException;

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

        /** @var User $user */
        $user = auth()->user();

        if (!($user->hasRole(UserRoleSeeder::ROLE_ADMIN)
            || $user->hasRole(UserRoleSeeder::ROLE_MEMBER)
        )
        ) {
            throw new UnauthorizedException(401, 'Member role needed');
        }

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

        if ($ticket == null) {
            return new Response(sprintf('Ticket not found by id %s', $id), 404);
        }

        $ticket->update($validatedData);

        return $ticket;
    }

    public function delete(Request $request, $id)
    {
        $ticket = Ticket::query()->find($id);

        if ($ticket == null) {
            return new Response(sprintf('Ticket not found by id %s', $id), 404);
        }

        $ticket->delete();

        return $ticket;
    }

    public function search(Request $request)
    {
        /** @var User $user */
        $user = auth()->user();

        if (!($user->hasRole(UserRoleSeeder::ROLE_ADMIN)
            || $user->hasRole(UserRoleSeeder::ROLE_MEMBER)
        )
        ) {
            throw new UnauthorizedException(401, 'Member role needed');
        }

        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);
        $tickets = Ticket::query()
            ->offset($offset)
            ->limit($limit)
            ->get();
//
        return $tickets;
    }
}
