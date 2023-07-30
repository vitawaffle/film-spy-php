<?php

namespace App\Http\Controllers;

use App\Events\{RoomCreated, RoomDeleted, UserJoinedRoom, UserKicked, UserLeftRoom};
use App\Http\Requests\{CreateRoomRequest, DeleteRoomRequest, JoinRoomRequest, KickPlayerRequest};
use App\Models\{Game, Room, User};
use Illuminate\Support\Facades\{Auth, Gate};

class RoomController extends Controller
{
    /** @return Room[] */
    public function get(): array
    {
        return Room::with('user:id,name,email')
            ->withCount('users')
            ->get()
            ->toArray();
    }

    /** @return User[] */
    public function users(Room $room): array
    {
        if (!Gate::allows('get-users-of-room', $room->id))
            abort(403);

        return $room->users->toArray();
    }

    public function create(CreateRoomRequest $request): void
    {
        $room = Room::create(array_merge(
            $request->validated(),
            ['user_id' => Auth::id()],
        ));

        $room->load('user:id,name,email');
        $room->loadCount('users');

        RoomCreated::dispatch($room->toArray());
    }

    public function join(JoinRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);
        $user = Auth::user();

        if (null !== $user->game_id)
            abort(400, 'You cannot change room during the game');

        if (null !== $user->room_id)
            UserLeftRoom::dispatch($user);

        $user->room_id = $room->id;
        $user->save();

        UserJoinedRoom::dispatch($user);
    }

    public function delete(DeleteRoomRequest $request): void
    {
        $room = Room::find($request->validated()['room_id']);

        if (!Gate::allows('room-owner', $room))
            abort(403);

        $room->loadCount('games');
        if (0 !== $room->games_count)
            abort(400, 'You cannot delete a room for which the game is started');

        User::where('room_id', $room->id)
            ->update(['room_id' => null]);

        RoomDeleted::dispatch($room);

        $room->delete();
    }

    public function leave(): void
    {
        $user = Auth::user();

        if (null === $user->room_id)
            return;

        if (null !== $user->game_id)
            abort(400, 'You cannot leave room during the game');

        UserLeftRoom::dispatch($user);

        $user->room_id = null;
        $user->save();
    }

    public function kick(Room $room, KickPlayerRequest $request): void
    {
        if (!Gate::allows('room-owner', $room))
            abort(403);

        $user = User::find($request->validated()['user_id']);

        if (null !== $user->game_id && $room->id === $user->game->room_id)
            abort(400, 'You cannot kick a user who is in the game');

        if (null !== $user->room_id) {
            $user->room_id = null;
            $user->save();

            UserKicked::dispatch($user, $room);
        }
    }
}
