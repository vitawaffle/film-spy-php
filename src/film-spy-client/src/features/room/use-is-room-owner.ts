import useCurrentRoomId from './use-current-room-id';
import { selectUser } from 'features/auth';
import { selectRoomById } from 'features/rooms';
import { useSelector } from 'store';

const useIsRoomOwner = (): boolean => {
  const roomId = useCurrentRoomId();
  const room = useSelector(selectRoomById(roomId));
  const user = useSelector(selectUser);

  return room !== undefined && user !== undefined && room.owner.id === user.id;
};

export default useIsRoomOwner;
