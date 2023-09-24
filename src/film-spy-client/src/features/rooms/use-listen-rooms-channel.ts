import { roomCreated } from './rooms-slice';
import type { RoomCreated } from 'broadcast-events';
import { useDispatch } from 'store';

const useListenRoomsChannel = (): { listenRoomsChannel: () => void, stopListeningRoomsChannel: () => void } => {
  const dispatch = useDispatch();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    dispatch(roomCreated(room));
  };

  return {
    listenRoomsChannel: (): void => {
      window.Echo.private('rooms')
        .listen('RoomCreated', handleRoomCreated);
    },
    stopListeningRoomsChannel: (): void => {
      window.Echo.private('rooms')
        .stopListening('RoomCreated');
    },
  };
};

export default useListenRoomsChannel;
