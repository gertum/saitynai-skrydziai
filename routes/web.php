<?php

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
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


//    Route::get('/countries', [CountryController::class, 'index'])->name('countries.index');
//    Route::get('/airplanes', [AirplaneController::class, 'index'])->name('airplanes.index');
//    Route::get('/airports', [AirportController::class, 'index'])->name('airports.index');
//    Route::get('/flights', [FlightController::class, 'index'])->name('flights.index');

//    Route::get('/flights', function () {
//        return Inertia::render('Flights/List');
//    });

//    Route::get('/tickets', 'TicketController@index')->name('tickets.index'); // Display available tickets
    Route::get('/cart', [CartWebController::class, 'index'])->name('cart');
});

Route::get('/error', [ErrorController::class, 'error'])->name('error');
require __DIR__ . '/auth.php';
