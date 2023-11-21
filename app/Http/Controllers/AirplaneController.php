<?php
namespace App\Http\Controllers;

use App\Models\Airplane;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirplaneController extends Controller
{
    public function index()
    {
        $airplanes = Airplane::all(); // Or use any logic to fetch countries

        return Inertia::render('Airplanes/List', [
            'airplanes' => $airplanes,
        ]);
    }
}
