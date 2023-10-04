import useCurrentRoomId from './use-current-room-id';
import { selectOwnedRooms } from 'features/rooms';
import { useSelector } from 'store';

const useIsRoomOwner = (): boolean => {
  const currentRoomId = useCurrentRoomId();
  const ownedRooms = useSelector(selectOwnedRooms);

  return ownedRooms.find(room => room.id === currentRoomId) !== undefined;
};

export default useIsRoomOwner;
