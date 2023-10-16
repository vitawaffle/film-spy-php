<?php

namespace App\Http\Controllers;

use App\Events\GameStarted;
use App\Http\Requests\StartGameRequest;
use App\Models\{Game, Order, Room};
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;

class GameController extends Controller
{
    private const PREPARATION_TIME = 10;

    public function getById(Game $game): Game
    {
        if (!Gate::allows('has-game', $game->id))
            abort(403);

        $game->load('users');
        $game->load('orders');

        return $game;
    }

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

        $this->createOrder($game);

        GameStarted::dispatch($game, null, $room->id);

        foreach ($users as $user)
            GameStarted::dispatch($game, $user->id, null);
    }

    private function createOrder(Game $game): void
    {
        $users = $game->users->shuffle();

        foreach($users as $i => $user) {
            Order::create([
                'game_id' => $game->id,
                'user_id' => $user->id,
                'order' => $i,
            ]);
        }
    }
}
