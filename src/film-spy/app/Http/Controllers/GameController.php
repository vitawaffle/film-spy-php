<?php

namespace App\Http\Controllers;

use App\Events\GameStarted;
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

        $game = Game::create(['name' => 'Game from "'.$room->name.'" room']);

        foreach ($room->users as $user)
            $game->users()->attach($user);

        $game->save();

        foreach ($game->users as $user)
            GameStarted::dispatch($game, $user->id);
    }
}
