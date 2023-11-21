<?php
namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlightController extends Controller
{
    public function index()
    {
        $flights = Flight::all();

        return Inertia::render('Flights/List', [
            'flights' => $flights,
        ]);
    }
}
