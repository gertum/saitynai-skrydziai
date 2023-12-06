<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function getCountryById(Request $request)
    {
        $countryId = $request->route('id'); // Accessing the parameter from the route
        $country = Country::find($countryId);
//        $country = Country::with('country')->find($countryId);
        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        return response()->json($country);
    }

    public function getAll() {
        return Country::all();
    }
}
