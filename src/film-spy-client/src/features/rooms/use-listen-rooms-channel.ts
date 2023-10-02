import { useLocation, useParams } from 'react-router-dom';

import { roomCreated, roomDeleted, roomKicked } from './rooms-slice';
import type { RoomCreated, RoomDeleted, UserKicked } from 'broadcast-events';
import { useDispatch } from 'store';

const useListenRoomsChannel = (): { listenRoomsChannel: () => void, stopListeningRoomsChannel: () => void } => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    dispatch(roomDeleted(room));

    if (pathname.startsWith('/rooms'))
  };

  const handleUserKicked = ({ room }: UserKicked): void => {
    dispatch(roomKicked(room));
  };

  return {
    listenRoomsChannel: (): void => {
      window.Echo.private('rooms')
        .listen('RoomCreated', handleRoomCreated)
        .listen('RoomDeleted', handleRoomDeleted)
        .listen('UserKicked', handleUserKicked);
    },
    stopListeningRoomsChannel: (): void => {
      window.Echo.private('rooms')
        .stopListening('RoomCreated')
        .stopListening('RoomDeleted')
        .stopListening('UserKicked');
    },
  };
};

export default useListenRoomsChannel;
