<?php

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

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

Route::get('/signin.html', [\App\Http\Controllers\AuthController::class, 'index'])->name('login');
Route::post('/signin.html', [\App\Http\Controllers\AuthController::class, 'doSignIn']);

Route::get('/recover.html', [\App\Http\Controllers\AuthController::class, 'index'])->name('recover');
Route::post('/recover.html', [\App\Http\Controllers\AuthController::class, 'doRecover']);

Route::get('/signout.html', [\App\Http\Controllers\AuthController::class, 'doSignOut']);

Route::group(['middleware' => ['auth']], function () {
    // your routes
    Route::view('/{path?}', 'app');
    Route::view('/amts/{path?}', 'app');
});
