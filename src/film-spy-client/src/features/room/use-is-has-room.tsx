import useCurrentRoomId from './use-current-room-id';
import { selectJoinedRooms } from 'features/rooms';
import { useSelector } from 'store';

const useIsHasRoom = (): boolean => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const roomId = useCurrentRoomId();

  return joinedRooms.find(room => room.id === roomId) !== undefined;
};

export default useIsHasRoom;
