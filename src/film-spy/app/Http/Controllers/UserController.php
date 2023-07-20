<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function user(): User
    {
        return User::with('room', 'room.user:id', 'game')->find(Auth::id());
    }
}
