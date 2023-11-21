<?php
namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::all(); // Or use any logic to fetch countries

        return view('countries.index', compact('countries'));
    }

    // Other country-related controller methods
}
