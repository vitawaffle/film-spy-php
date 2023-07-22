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
            'get-users-of-room',
            fn (User $user, int $roomId) => $user->room_id === $roomId,
        );

        Gate::define(
            'room-owner',
            fn (User $user, Room $room) => $user->id === $room->user_id,
        );

        Gate::define(
            'in-own-room',
            fn (User $user) => null !== $user->room_id && $user->room->user_id === $user->id,
        );

        Gate::define('has-game', fn (User $user) => null !== $user->game_id);
    }
}
