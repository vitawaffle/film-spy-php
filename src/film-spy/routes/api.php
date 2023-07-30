<?php

use App\Http\Controllers\{GameController, RoomController, UserController};
use Illuminate\Support\Facades\{Broadcast, Route};

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

Route::middleware('auth:sanctum')
    ->prefix('/users')
    ->controller(UserController::class)
    ->group(function () {
        Route::get('/me', 'user');
    });

Route::middleware('auth:sanctum')
    ->prefix('/rooms')
    ->controller(RoomController::class)
    ->group(function () {
        Route::get('/', 'get');
        Route::get('/{room}/users', 'users');
        Route::post('/{room}/kick', 'kick');
        Route::post('/create', 'create');
        Route::post('/join', 'join');
        Route::post('/delete', 'delete');
        Route::post('/leave', 'leave');
    });

Route::middleware('auth:sanctum')
    ->prefix('/games')
    ->controller(GameController::class)
    ->group(function () {
        Route::post('/start', 'start');
        Route::get('/current', 'current');
    });

Broadcast::routes(['middleware' => ['auth:sanctum']]);
