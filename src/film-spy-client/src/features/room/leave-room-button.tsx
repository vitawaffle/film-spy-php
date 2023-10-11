import React from 'react';
import { useNavigate } from 'react-router-dom';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { roomLeft } from 'features/rooms';
import { ConfirmableActionButton } from 'features/ui';
import { strings } from 'localization';
import { useDispatch } from 'store';

const LeaveRoomButton = (): React.ReactElement => {
  const roomId = useCurrentRoomId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const leaveRoom = async (): Promise<void> => {
    await client.post(`/api/rooms/${roomId}/leave`);
    navigate('/rooms');
    dispatch(roomLeft(roomId));
  };

  return (
    <ConfirmableActionButton
      id="leaveRoom"
      title={strings.features.room.leaveRoomButton.leaveRoom}
      variant="outlined"
      action={leaveRoom}
    >
      {strings.features.room.leaveRoomButton.leaveRoom}
    </ConfirmableActionButton>
  );
};

export default LeaveRoomButton;
