<?php

use App\Models\{Room, User};
use Illuminate\Support\Facades\{Auth, Broadcast};

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
    fn (User $user, Room $room) => $room->id === $user->room_id,
);

Broadcast::channel('rooms', fn () => Auth::check());
