import useCurrentRoomId from './use-current-room-id';
import { selectJoinedRooms } from 'features/rooms';
import { useSelector } from 'store';

const useIsHasRoom = (): boolean => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const currentRoomId = useCurrentRoomId();

  return joinedRooms.find(room => room.id === currentRoomId) !== undefined;
};

export default useIsHasRoom;
