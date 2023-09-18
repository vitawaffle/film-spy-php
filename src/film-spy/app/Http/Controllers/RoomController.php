<?php

namespace App\Http\Controllers;

use App\Events\{RoomCreated, RoomDeleted, UserJoinedRoom, UserKicked, UserLeftRoom};
use App\Http\Requests\{CreateRoomRequest, DeleteRoomRequest, JoinRoomRequest, KickPlayerRequest, LeaveRoomRequest};
use App\Models\{Room, User};
use Illuminate\Support\Facades\{Auth, Gate};

class RoomController extends Controller
{
    /** @return Room[] */
    public function get(): array
    {
        return Room::with('owner:id,name,email')
            ->withCount('users')
            ->get()
            ->toArray();
    }

    /** @return User[] */
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

        $room->load('owner:id,name,email');
        $room->loadCount('users');

        RoomCreated::dispatch($room->toArray());
    }

    public function join(JoinRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);
        $user = User::find(Auth::id());

        $user->rooms()->attach($room);
        $user->save();

        UserJoinedRoom::dispatch($user);
    }

    public function delete(DeleteRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);

        if (!Gate::allows('room-owner', $room))
            abort(403);

        RoomDeleted::dispatch($room);

        $room->delete();
    }

    public function leave(LeaveRoomRequest $request): void
    {
        $roomId = $request->validated()['room_id'];
        $user = User::find(Auth::id());

        $user->rooms()->detach($roomId);
        $user->save();

        UserLeftRoom::dispatch($roomId, $user);
    }

    public function kick(Room $room, KickPlayerRequest $request): void
    {
        if (!Gate::allows('room-owner', $room))
            abort(403);

        $user = User::find($request->validated()['user_id']);

        if (null !== $user->room_id) {
            $user->room_id = null;
            $user->save();

            UserKicked::dispatch($user, $room);
        }

        $user->rooms()->detach($room->id);
        $user->save();

        UserKicked::dispatch($user, $room);
    }
}
