<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Collection, Model, SoftDeletes};
use Illuminate\Database\Eloquent\Relations\{BelongsTo, BelongsToMany};

/**
 * @property int $owner_id
 * @property User $owner
 * @property Collection<User> $users
 */
class Room extends Model
{
    use HasFactory, CamelCase, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'password',
        'owner_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_rooms');
    }
}
