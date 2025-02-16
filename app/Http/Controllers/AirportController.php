<?php
namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportController extends Controller
{
    public function index()
    {
        $airports= Airport::all();

        return Inertia::render('Airports/List', [
            'airports' => $airports,
        ]);
    }
}
