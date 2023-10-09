<?php

namespace App\Http\Controllers;

use App\Http\Requests\StartGameRequest;
use App\Models\{Game, Room};
use Illuminate\Support\Facades\Gate;

class GameController extends Controller
{
    public function start(StartGameRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);

        if (!Gate::allows('room-owner', $room))
            abort(403);

        Game::create([
            'users' => $room->users,
        ]);
    }
}
