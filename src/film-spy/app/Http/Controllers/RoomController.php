<?php

namespace App\Http\Controllers;

use App\Events\{RoomCreated, RoomDeleted, UserJoinedRoom, UserKicked, UserLeftRoom};
use App\Http\Requests\{CreateRoomRequest, JoinRoomRequest, KickPlayerRequest};
use App\Models\{Room, User};
use Illuminate\Support\Facades\{Auth, Gate};

class RoomController extends Controller
{
    /** @return array<int, Room> */
    public function get(): array
    {
        return Room::with('owner:id,name')
            ->withCount('users')
            ->get()
            ->toArray();
    }

    /** @return array<int, Room> */
    public function getJoined(): array
    {
        return User::find(Auth::id())->rooms->toArray();
    }

    /** @return array<int, User> */
    public function getUsers(Room $room): array
    {
        if (!Gate::allows('get-users-of-room', $room->id))
            abort(403);

        return $room->users->toArray();
    }

    public function create(CreateRoomRequest $request): void
    {
        $room = Room::create(array_merge(
            $request->validated(),
            ['owner_id' => Auth::id()],
        ));

        $room->load('owner:id,name');
        $room->loadCount('users');

        RoomCreated::dispatch($room->toArray());
    }

    public function join(JoinRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);
        $user = User::find(Auth::id());

        if (!$user->rooms->contains(fn ($item) => $item->id === $room->id)) {
            $user->rooms()->attach($room);
            $user->save();

            UserJoinedRoom::dispatch($user, $room);
        }
    }

    public function delete(Room $room): void
    {
        if (!Gate::allows('room-owner', $room))
            abort(403);

        RoomDeleted::dispatch($room);

        $room->delete();
    }

    public function leave(Room $room): void
    {
        $user = User::find(Auth::id());

        $user->rooms()->detach($room->id);
        $user->save();

        UserLeftRoom::dispatch($room->id, $user);
    }

    public function kick(Room $room, KickPlayerRequest $request): void
    {
        if (!Gate::allows('room-owner', $room))
            abort(403);

        $user = User::find($request->validated()['user_id']);

        $user->rooms()->detach($room->id);
        $user->save();

        UserKicked::dispatch($user, $room);
    }
}
