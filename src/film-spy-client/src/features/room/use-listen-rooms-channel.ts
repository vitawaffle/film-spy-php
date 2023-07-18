import type { RoomCreated, RoomDeleted } from 'broadcast-events';
import { roomCreated, roomDeleted } from 'features/room';
import { useAppDispatch } from 'hooks';

const useListenRoomsChannel = (): () => void => {
  const dispatch = useAppDispatch();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    console.log('RoomCreated');

    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    console.log('RoomDeleted');

    dispatch(roomDeleted(room));
  };

  const listemRoomsChannel = (): void => {
    window.Echo.private('rooms')
      .stopListening('RoomCreated')
      .listen('RoomCreated', handleRoomCreated)
      .stopListening('RoomDeleted')
      .listen('RoomDeleted', handleRoomDeleted);
  };

  return listemRoomsChannel;
};

export default useListenRoomsChannel;
