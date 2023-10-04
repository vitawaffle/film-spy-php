import { useEffect } from 'react';

import useCurrentRoomId from './use-current-room-id';
import { selectUser } from 'features/auth';
import { selectRoomById, useLoadRooms } from 'features/rooms';
import { useSelector } from 'store';

const useIsRoomOwner = (): boolean => {
  const currentRoomId = useCurrentRoomId();
  const room = useSelector(selectRoomById(currentRoomId));
  const user = useSelector(selectUser);

  return room !== undefined && user !== undefined && room.owner.id === user.id;
};

export default useIsRoomOwner;
