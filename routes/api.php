<?php

use App\Http\Controllers\Api\AirportController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\FlightController;
use App\Http\Controllers\Api\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;

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
//Route::middleware('auth')->group(function () {
    Route::get('/flight', [FlightController::class, 'search']);
//});
Route::get('/flight/{flightId}', [FlightController::class, 'read']);
Route::get('/flight/{flightId}/tickets', [FlightController::class, 'getTickets']);

Route::middleware('auth')->group(function () {
    Route::post('/flight', [FlightController::class, 'create']);
    Route::put('/flight/{flightId}', [FlightController::class, 'update']);
    Route::delete('/flight/{flightId}', [FlightController::class, 'delete']);
});



Route::middleware('auth')->group(function () {
    Route::get('/ticket/{id}', [TicketController::class, 'read']);
    Route::get('/ticket', [TicketController::class, 'search']);
    Route::post('/ticket', [TicketController::class, 'create']);
    Route::put('/ticket/{id}', [TicketController::class, 'update']);
    Route::delete('/ticket/{id}', [TicketController::class, 'delete']);
});

//Route::get('/airport/{id}', [AirportController::class, 'getAirportById']);

Route::get('/airport', [AirportController::class, 'search']);
Route::get('/airport/{id}', [AirportController::class, 'read']);
Route::get('/airport/{id}/tickets', [AirportController::class, 'tickets']);

Route::middleware('auth')->group(function () {
    Route::put('/airport/{id}', [AirportController::class, 'update']);
    Route::delete('/airport/{id}', [AirportController::class, 'delete']);
    Route::post('/airport', [AirportController::class, 'create']);
});


Route::get('/country/{id}', [CountryController::class, 'getCountryById']);

Route::middleware('auth')->group(function () {
    Route::get('/country', [CountryController::class, 'getAll']);
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});


//Route::get('/tickets', 'TicketApiController@index'); // API endpoint to fetch tickets data
//Route::post('/cart', 'CartApiController@store'); // API endpoint to add tickets to the cart
