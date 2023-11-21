<?php
namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::all(); // Or use any logic to fetch countries

//        return view('countries.index', compact('countries'));

        return Inertia::render('Countries/List', [
            'countries' => $countries,
        ]);
    }
}
