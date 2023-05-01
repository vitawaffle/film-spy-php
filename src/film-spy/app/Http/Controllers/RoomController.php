<?php

namespace App\Http\Controllers;

use App\Http\Requests\{CreateRoomRequest, JoinRoomRequest};
use App\Models\{Room, User};
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function create(CreateRoomRequest $request): void
    {
        Room::create(array_merge(
            $request->validated(),
            ['user_id' => Auth::id()],
        ));
    }

    /** @return Room[] */
    public function getAll(): array
    {
        return Room::all()->toArray();
    }

    public function join(JoinRoomRequest $request): void
    {
        $user = User::find(Auth::id());

        $user->room_id = $request->validated()['room_id'];

        $user->save();
    }
}
