<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getMe(): User
    {
        return User::with(['rooms', 'ownedRooms', 'games.users'])->find(Auth::id());
    }
}
