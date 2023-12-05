<?php

use App\Http\Controllers\Api\AirportsController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CountriesController;
use App\Http\Controllers\Api\FlightsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'cart'])->name('api_cart');
    Route::get('/cart', [CartController::class, 'add'])->name('api_cart');
});

//Route::get('/cart', [CartController::class, 'show']);

Route::get('/flight', [FlightsController::class, 'search']);
Route::get('/flight/{flightId}', [FlightsController::class, 'read']);
Route::post('/flight', [FlightsController::class, 'create']);
Route::put('/flight/{flightId}', [FlightsController::class, 'update']);
Route::delete('/flight/{flightId}', [FlightsController::class, 'delete']);
Route::get('/flight/{flightId}/tickets', [FlightsController::class, 'getTickets']);

Route::get('/airport/{id}', [AirportsController::class, 'getAirportById']);
Route::get('/country/{id}', [CountriesController::class, 'getCountryById']);



//Route::get('/tickets', 'TicketApiController@index'); // API endpoint to fetch tickets data
//Route::post('/cart', 'CartApiController@store'); // API endpoint to add tickets to the cart
