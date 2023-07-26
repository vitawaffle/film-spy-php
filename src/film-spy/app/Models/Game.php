<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'spy_id',
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function spy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'spy_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
