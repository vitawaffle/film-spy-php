<?php

namespace App\Http\Controllers;

use App\Events\{DeleteRoom, JoinRoom, LeaveRoom};
use App\Http\Requests\{CreateRoomRequest, DeleteRoomRequest, JoinRoomRequest};
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
    public function getUsers(Room $room): array
    {
        if (!Gate::allows('get-users-of-room', $room->id))
            abort(403);

        return $room->users->toArray();
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

    public function delete(DeleteRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);

        if (!Gate::allows('room-owner', $room))
            abort(403);

        User::where('room_id', $room->id)
            ->update(['room_id' => null]);

        DeleteRoom::dispatch($room);

        $room->delete();
    }

    public function leave(): void
    {
        $user = User::find(Auth::id());

        if (null === $user->room_id)
            return;

        LeaveRoom::dispatch($user);

        $user->room_id = null;
        $user->save();
    }
}
