import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { RoomCreated, RoomDeleted } from 'broadcast-events';
import { selectCurrentRoom, roomCreated, roomDeleted } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';

const useListenRoomsChannel = (): {
  listenRoomsChannel: () => void,
  stopListeningRoomsChannel: () => void,
} => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    console.log('RoomCreated');

    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    console.log('RoomDeleted');

    dispatch(roomDeleted(room));

    if (currentRoom?.id === room.id)
      navigate('/home');
  };

  const listenRoomsChannel = (): void => {
    window.Echo.private('rooms')
      .listen('RoomCreated', handleRoomCreated)
      .listen('RoomDeleted', handleRoomDeleted);
  };

  const stopListeningRoomsChannel = (): void => {
    window.Echo.private('rooms')
      .stopListening('RoomCreated')
      .stopListening('RoomDeleted');
  };

  return { listenRoomsChannel, stopListeningRoomsChannel };
};

export default useListenRoomsChannel;
