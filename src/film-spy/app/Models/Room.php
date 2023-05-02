<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'password',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ['password'];

    public function user(): BelongsTo
    {
        return $this->belonsgTo(User::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
