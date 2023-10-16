<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Collection, Model};
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany, HasMany};
use Illuminate\Support\Facades\Auth;

/**
 * @property Collection<User> $users
 * @property int $spy_id
 * @property User $spy
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
        'spy_id',
        'started_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'spy_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'started_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'is_spy',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_games');
    }

    public function spy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'spy_id');
    }

    protected function isSpy(): Attribute
    {
        return new Attribute(get: fn () => Auth::id() === $this->spy_id);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
