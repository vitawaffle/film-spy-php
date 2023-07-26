<?php

namespace App\Http\Controllers;

use App\Events\GameStarted;
use App\Models\{Game, User};
use Illuminate\Support\Facades\{Auth, Gate};

class GameController extends Controller
{
    private const MIN_PLAYERS = 1;
    public function start(): void
    {
        if (!Gate::allows('in-own-room'))
            abort(403);

        $room = Auth::user()->room;
        $room->loadCount('users');

        if (self::MIN_PLAYERS > $room->users_count)
            abort(400, 'You cannot start the game with less than 3 players');

        $users = User::where('room_id', $room->id)->get();
        $spyNumber = rand(0, $users->count() - 1);

        $game = Game::create([
            'room_id' => $room->id,
            'spy_id' => $users->get($spyNumber),
        ]);

        User::where('room_id', $room->id)
            ->update(['game_id' => $game->id]);

        GameStarted::dispatch($room->id);
    }

    public function current(): Game
    {
        if (!Gate::allows('has-game'))
            abort(403);

        $game = Auth::user()->game;
        $game->load('users');

        return $game;
    }
}
