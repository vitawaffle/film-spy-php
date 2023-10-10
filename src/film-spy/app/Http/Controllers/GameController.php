<?php

namespace App\Http\Controllers;

use App\Events\GameCreated;
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

        $game = Game::create(['room_id' => $room->id]);

        foreach ($room->users as $user)
            $game->users()->attach($user);

        $game->save();

        GameCreated::dispatch($game);
    }
}
