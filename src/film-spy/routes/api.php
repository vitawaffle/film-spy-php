<?php

use App\Http\Controllers\{RoomController, UserController};
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
        Route::get('/', 'getAll');
        Route::get('/{id}/users', 'getUsers');
        Route::post('/create', 'create');
        Route::post('/join', 'join');
        Route::post('/delete', 'delete');
        Route::post('/leave', 'leave');
    });
