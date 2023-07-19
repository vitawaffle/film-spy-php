import type { RoomCreated, RoomDeleted } from 'broadcast-events';
import { roomCreated, roomDeleted } from 'features/room';
import { useAppDispatch } from 'hooks';

const useListenRoomsChannel = (): {
  listenRoomsChannel: () => void,
  stopListeningRoomsChannel: () => void,
} => {
  const dispatch = useAppDispatch();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    console.log('RoomCreated');

    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    console.log('RoomDeleted');

    dispatch(roomDeleted(room));
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
