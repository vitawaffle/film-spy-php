import { useParams } from 'react-router-dom';

import { selectJoinedRooms } from 'features/rooms';
import { useSelector } from 'store';

const useIsHasRoom = (): boolean => {
  const { id } = useParams();
  const joinedRooms = useSelector(selectJoinedRooms);

  return joinedRooms.find(room => room.id === parseInt(id ?? '0')) !== undefined;
};

export default useIsHasRoom;
