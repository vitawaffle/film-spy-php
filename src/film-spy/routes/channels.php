<?php

use App\Models\{Game, Room, User};
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
    'personal.{id}',
    fn (User $user, int $id) => (int) $user->id === $id,
);

Broadcast::channel(
    'rooms.{id}',
    fn (User $user, int $id) => $user->rooms->contains(fn ($room) => $room->id === $id),
);

Broadcast::channel(
    'games.{id}',
    fn (User $user, int $id) => $user->games->contains(fn ($game) => $game->id === $id),
);

Broadcast::channel('common', fn () => Auth::check());
