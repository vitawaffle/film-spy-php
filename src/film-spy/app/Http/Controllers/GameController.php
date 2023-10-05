<?php

namespace App\Http\Controllers;

use App\Http\Requests\StartGameRequest;
use App\Models\Room;

class GameController extends Controller
{
    public function start(StartGameRequest $request): void
    {
        $users = Room::find($request->validated()['room_id'])->users;
    }
}
