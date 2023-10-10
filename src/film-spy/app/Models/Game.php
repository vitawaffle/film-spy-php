<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Collection, Model};
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property Collection<User> $users
 */
class Game extends Model
{
    use HasFactory, CamelCase;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        //
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_games');
    }
}
