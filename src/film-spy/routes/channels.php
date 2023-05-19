<?php

use App\Models\{Room, User};
use Illuminate\Support\Facades\{Broadcast, Log};

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel(
    'rooms.{room}',
    // fn (User $user, int $roomId) => $roomId === $user->room_id,
    function (User $user, Room $room) {
        Log::info($room->id);
        Log::info($user->room_id);

        return $room->id === $user->room_id;
    }
);
