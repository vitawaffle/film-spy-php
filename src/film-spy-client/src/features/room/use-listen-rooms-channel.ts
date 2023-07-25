import { roomCreated, roomDeleted } from 'app-slice';
import type { RoomCreated, RoomDeleted } from 'broadcast-events';
import { useAppDispatch } from 'hooks';

const useListenRoomsChannel = (): {
  listenRoomsChannel: () => void,
  stopListeningRoomsChannel: () => void,
} => {
  const dispatch = useAppDispatch();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    /* Debug */
    console.log('RoomCreated:');
    console.log(room);
    /* ***** */

    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    /* Debug */
    console.log('RoomDeleted:');
    console.log(room);
    /* ***** */

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
