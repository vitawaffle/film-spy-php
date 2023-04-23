<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\Models\Room;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function create(CreateRoomRequest $request): void
    {
        Room::create(array_merge(
            $request->validated(),
            ['user_id' => Auth::id()],
        ));
    }

    /** @return Room[] */
    public function getAll(): array
    {
        return Room::all()->toArray();
    }
}
