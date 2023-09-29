<?php

use App\Http\Controllers\{RoomController, UserController};
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
        Route::get('/me', 'getMe');
    });

Route::middleware('auth:sanctum')
    ->prefix('/rooms')
    ->controller(RoomController::class)
    ->group(function () {
        Route::get('/', 'get');
        Route::get('/joined', 'getJoined');

        Route::middleware('verified')->group(function () {
            Route::get('/{room}/users', 'getUsers');
            Route::delete('/{room}', 'delete');
            Route::post('/{room}/leave', 'leave');
            Route::post('/{room}/kick', 'kick');
            Route::post('/create', 'create');
            Route::post('/join', 'join');
        });
    });

Broadcast::routes(['middleware' => ['auth:sanctum']]);
