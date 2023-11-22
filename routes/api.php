<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\FlightsController;

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

//Route::middleware('auth')->group(function () {
    Route::get('/flights', [FlightsController::class, 'search']);
//});
//Route::get('/tickets', 'TicketApiController@index'); // API endpoint to fetch tickets data
Route::post('/cart', 'CartApiController@store'); // API endpoint to add tickets to the cart
