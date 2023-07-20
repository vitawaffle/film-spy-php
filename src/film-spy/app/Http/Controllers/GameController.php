<?php

namespace App\Http\Controllers;

use App\Events\GameStarted;
use App\Models\{Game, User};
use Illuminate\Support\Facades\{Auth, Gate};

class GameController extends Controller
{
    public function start(): void
    {
        if (!Gate::allows('in-own-room'))
            abort(403);

        $room = Auth::user()->room;
        $room->loadCount('users');

        if (3 > $room->users_count)
            abort(400, 'You cannot start the game with less than 3 players');

        $game = Game::create(['room_id' => $room->id]);

        User::where('room_id', $room->id)
            ->update(['game_id' => $game->id]);

        GameStarted::dispatch($room->id);
    }
}
