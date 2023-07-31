<?php

namespace App\Http\Controllers;

use App\Events\GameStarted;
use App\Models\{Game, Order, User};
use Illuminate\Support\Facades\{Auth, Gate};

class GameController extends Controller
{
    private const MIN_PLAYERS = 1;

    public function start(): void
    {
        if (!Gate::allows('has-room'))
            abort(403, 'You must be in the room to start the game');

        $room = Auth::user()->room;
        if (!Gate::allows('room-owner', $room))
            abort(403);

        $room->loadCount('games');
        if (0 !== $room->games_count)
            abort(400, 'There can only be one active game in the room');

        $room->loadCount('users');
        if (self::MIN_PLAYERS > $room->users_count)
            abort(400, 'You cannot start the game with less than '.self::MIN_PLAYERS.' players');

        $users = User::where('room_id', $room->id)->get();

        $spyNumber = rand(0, $users->count() - 1);
        $game = Game::create([
            'room_id' => $room->id,
            'spy_id' => $users->get($spyNumber)->id,
        ]);

        User::where('room_id', $room->id)->update(['game_id' => $game->id]);

        $users = $users->shuffle();
        foreach ($users as $key => $user) {
            Order::create([
                'game_id' => $game->id,
                'user_id' => $user->id,
                'order' => $key,
            ]);
        }

        GameStarted::dispatch($room->id);
    }

    public function current(): Game
    {
        if (!Gate::allows('has-game'))
            abort(403);

        $user = Auth::user();

        $game = $user->game;
        $game->load('users');
        $game->load('orders');

        $game->is_spy = $game->spy_id === $user->id;

        return $game;
    }
}
