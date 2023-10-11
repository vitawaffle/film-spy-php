import React from 'react';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { ConfirmableActionButton } from 'features/ui';
import { strings } from 'localization';

const StartGameButton = (): React.ReactElement => {
  const currentRoomId = useCurrentRoomId();

  const startGame = async (): Promise<void> => {
    await client.post('/api/games/start', { room_id: currentRoomId });
  };

  return (
    <ConfirmableActionButton
      id="startGame"
      title={strings.features.room.startGameButton.startGame}
      action={startGame}
    >
      {strings.features.room.startGameButton.startGame}
    </ConfirmableActionButton>
  );
};

export default StartGameButton;
