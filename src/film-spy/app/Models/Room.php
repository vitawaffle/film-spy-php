<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'password',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belonsgTo(User::class);
    }
}
