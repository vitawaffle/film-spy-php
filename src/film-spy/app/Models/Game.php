<?php

namespace App\Models;

use App\Models\{Room, User};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
