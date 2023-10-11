import React from 'react';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { ConfirmableActionButton } from 'features/ui';
import { strings } from 'localization';

const DeleteRoomButton = (): React.ReactElement => {
  const roomId = useCurrentRoomId();

  const deleteRoom = async (): Promise<void> => {
    await client.delete(`/api/rooms/${roomId}`);
  };

  return (
    <ConfirmableActionButton
      id="deleteRoom"
      title={strings.features.room.deleteRoomButton.deleteRoom}
      variant="outlined"
      color="error"
      action={deleteRoom}
    >
      {strings.features.room.deleteRoomButton.deleteRoom}
    </ConfirmableActionButton>
  );
};

export default DeleteRoomButton;
