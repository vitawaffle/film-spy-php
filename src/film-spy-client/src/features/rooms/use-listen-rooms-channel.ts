import { roomCreated, roomDeleted } from './rooms-slice';
import type { RoomCreated, RoomDeleted } from 'broadcast-events';
import { useDispatch } from 'store';

const useListenRoomsChannel = (): { listenRoomsChannel: () => void, stopListeningRoomsChannel: () => void } => {
  const dispatch = useDispatch();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    dispatch(roomDeleted(room));
  };

  return {
    listenRoomsChannel: (): void => {
      window.Echo.private('rooms')
        .listen('RoomCreated', handleRoomCreated)
        .listen('RoomDeleted', handleRoomDeleted);
    },
    stopListeningRoomsChannel: (): void => {
      window.Echo.private('rooms')
        .stopListening('RoomCreated')
        .stopListening('RoomDeleted');
    },
  };
};

export default useListenRoomsChannel;
