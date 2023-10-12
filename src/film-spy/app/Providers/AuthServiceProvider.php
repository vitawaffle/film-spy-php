<?php

namespace App\Providers;

use App\Models\{Room, User};
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define(
            'room-owner',
            fn (User $user, Room $room) => $user->id === $room->owner_id,
        );

        Gate::define(
            'has-room',
            fn(User $user, int $roomId) => $user->rooms->contains(fn ($room) => $room->id === $roomId),
        );

        Gate::define(
            'has-game',
            fn (User $user, int $gameId) => $user->games->contains(fn ($game) => $game->id === $gameId),
        );
    }
}
