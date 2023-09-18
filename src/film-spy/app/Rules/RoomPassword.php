<?php

namespace App\Rules;

use App\Models\Room;
use Closure;
use Illuminate\Contracts\Validation\{DataAwareRule, ValidationRule};
use Illuminate\Support\Facades\Auth;

class RoomPassword implements DataAwareRule, ValidationRule
{
    private int $roomId;

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->roomId = $data['room_id'];

        return $this;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(
        string $attribute,
        mixed $value,
        Closure $fail,
    ): void {
        $room = Room::find($this->roomId);
        $userId = Auth::id();

        if (null !== $room->password
            && $userId !== $room->owner_id
            && $value !== $room->password
        ) {
            $fail('Invalid room password');
        }
    }
}
