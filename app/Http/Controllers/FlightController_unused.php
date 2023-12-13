<?php
namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlightControllerUnused extends Controller
{
    public function index()
    {
        return Inertia::render('Flights_unused/List');
    }
}
