import { useParams } from 'react-router-dom';

import { selectUser } from 'features/auth';
import { selectRoomById } from 'features/rooms';
import { useSelector } from 'store';

const useIsRoomOwner = (): boolean => {
  const { id } = useParams();
  const room = useSelector(selectRoomById(parseInt(id ?? '0')));
  const user = useSelector(selectUser);

  return room !== undefined && user !== undefined && room.owner.id === user.id;
};

export default useIsRoomOwner;
