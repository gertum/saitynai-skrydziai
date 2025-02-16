<?php

use App\Http\Controllers\AirplaneController;
use App\Http\Controllers\AirportController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CartWebController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ErrorController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome'); // Name the route outside of the Inertia::render() call


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
//    return "Laba diena";
})
//    ->middleware(['auth', 'verified'])->name('dashboard')
;


//Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


//    Route::get('/countries', [CountryController::class, 'index'])->name('countries.index');
//    Route::get('/airplanes', [AirplaneController::class, 'index'])->name('airplanes.index');
    Route::get('/airports', [AirportController::class, 'index'])->name('airports.index');
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index'); // Display available tickets

//    Route::get('/flights', [FlightControllerUnused::class, 'index'])->name('flights.index');

//    Route::get('/flights', function () {
//        return Inertia::render('Flights/List');
//    });

    Route::get('/cart', [CartWebController::class, 'index'])->name('cart');
//});

Route::get('/error', [ErrorController::class, 'error'])->name('error');
require __DIR__ . '/auth.php';



//Route::get('/test-me', function () {
//    return Inertia::render('Auth/TestMe');
//})->name('test.me');

//Route::get('/edit-airport/{item_id}', function () {
//    return Inertia::render('Airports/Edit');
//})->name('edit.airport');
Route::get('/edit-airport/{item_id}', function ($item_id) {
    return Inertia::render('Airports/Edit', ['item_id' => $item_id]);
})->name('edit.airport');

Route::get('/edit-ticket/{ticket_id}', function ($ticket_id) {
    return Inertia::render('Tickets/Edit', ['ticket_id' => $ticket_id]);
})->name('edit.ticket');

Route::get('/edit-flight/{flight_id}', function ($flight_id) {
    return Inertia::render('Flights/Edit', ['flight_id' => $flight_id]);
})->name('edit.flight');

Route::get('/add-ticket', function () {
    return Inertia::render('Tickets/Add');
})->name('add.ticket');

Route::get('/add-flight', function () {
    return Inertia::render('Flights/Add');
})->name('add.flight');

Route::get('/add-airport', function () {
    return Inertia::render('Airports/Add');
})->name('add.airport');

Route::get('/load', function () {
    return Inertia::render('LoadingSpinner');
})->name('load');

Route::get('/fly', function () {
    return Inertia::render('FlyingLogo');
})->name('fly');
