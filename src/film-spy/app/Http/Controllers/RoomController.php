<?php

namespace App\Http\Controllers;

use App\Events\{JoinRoom, LeaveRoom};
use App\Http\Requests\{CreateRoomRequest, JoinRoomRequest};
use App\Models\{Room, User};
use Illuminate\Support\Facades\{Auth, Gate};

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

    /** @return User[] */
    public function getUsers(int $roomId): array
    {
        if (!Gate::allow('get-users-for-room', $roomId))
            abort(403);

        return Room::find($roomId)->users();
    }

    public function join(JoinRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);
        $user = User::find(Auth::id());

        if (null !== $user->room_id)
            LeaveRoom::dispatch($user);

        $user->room_id = $room->id;
        $user->save();

        JoinRoom::dispatch($user);
    }
}
