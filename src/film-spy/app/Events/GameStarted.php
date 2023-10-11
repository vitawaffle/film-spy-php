<?php

namespace App\Events;

use App\Models\Game;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameStarted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        private readonly Game $game,
        private readonly ?int $userId = null,
        private readonly ?int $roomId = null,
    ) {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $broadcastOn = [];

        if (null !== $this->roomId)
            $broadcastOn[] = new PrivateChannel('rooms.'.$this->roomId);

        if (null !== $this->userId)
            $broadcastOn[] = new PrivateChannel('personal.'.$this->userId);

        return $broadcastOn;
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'game' => $this->game,
        ];
    }
}
