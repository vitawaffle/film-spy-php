import client from 'client';
import { useAppDispatch } from 'hooks';
import { setRooms, setIsLoading } from 'features/rooms';
import { Room } from 'models';

const useLoadRooms = () => {
  const dispatch = useAppDispatch();

  const loadRooms = async () => {
    dispatch(setIsLoading(true));

    try {
      dispatch(setRooms((await client.get<Room[]>('/api/rooms')).data));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return loadRooms;
};

export default useLoadRooms;
