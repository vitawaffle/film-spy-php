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

Broadcast::channel(
    'personal.{user}',
    fn (User $authenticatedUser, User $user) => (int) $authenticatedUser->id === $user->id,
);

Broadcast::channel(
    'rooms.{room}',
    fn (User $user, Room $room) => $user->rooms->contains(fn ($item) => $item->id === $room->id),
);

Broadcast::channel('common', fn () => Auth::check());
