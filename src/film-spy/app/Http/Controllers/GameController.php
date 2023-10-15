<?php

namespace App\Http\Controllers;

use App\Events\GameStarted;
use App\Http\Requests\StartGameRequest;
use App\Models\{Game, Room};
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;

class GameController extends Controller
{
    private const PREPARATION_TIME = 10;

    public function start(StartGameRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);

        if (!Gate::allows('room-owner', $room))
            abort(403);

        $users = $room->users;

        $game = Game::create([
            'name' => 'Game from "'.$room->name.'" room',
            'spy_id' => $users->get(rand(0, count($users) - 1))->id,
            'started_at' => Carbon::now()->addSecond(self::PREPARATION_TIME),
        ]);

        foreach ($users as $user)
            $game->users()->attach($user);

        $game->save();

        $game->load('users');

        GameStarted::dispatch($game, null, $room->id);

        foreach ($users as $user)
            GameStarted::dispatch($game, $user->id, null);
    }
}
