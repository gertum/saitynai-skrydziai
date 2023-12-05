<?php

use App\Http\Controllers\Api\AirportController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\FlightController;
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

Route::get('/flight', [FlightController::class, 'search']);
Route::get('/flight/{flightId}', [FlightController::class, 'read']);
Route::post('/flight', [FlightController::class, 'create']);
Route::put('/flight/{flightId}', [FlightController::class, 'update']);
Route::delete('/flight/{flightId}', [FlightController::class, 'delete']);
Route::get('/flight/{flightId}/tickets', [FlightController::class, 'getTickets']);


//Route::get('/ticket', [Tick::class, 'getTickets']);

Route::get('/airport/{id}', [AirportController::class, 'getAirportById']);
Route::get('/country/{id}', [CountryController::class, 'getCountryById']);



//Route::get('/tickets', 'TicketApiController@index'); // API endpoint to fetch tickets data
//Route::post('/cart', 'CartApiController@store'); // API endpoint to add tickets to the cart
