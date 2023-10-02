import {
  joinedRoomsLoadingStarted,
  joinedRoomsLoaded,
  selectIsJoinedRoomsLoaded,
  selectJoinedRooms,
} from './rooms-slice';
import client from 'client';
import type { Room } from 'models';
import { useDispatch, useSelector } from 'store';

const useLoadJoinedRooms = (): () => Promise<Room[]> => {
  const isLoaded = useSelector(selectIsJoinedRoomsLoaded);
  const loadedRooms = useSelector(selectJoinedRooms);
  const dispatch = useDispatch();

  return async (): Promise<Room[]> => {
    if (isLoaded)
      return loadedRooms;

    dispatch(joinedRoomsLoadingStarted());

    let rooms: Room[] = [];

    try {
      rooms = (await client.get<Room[]>('/api/rooms/joined')).data;
    } finally {
      dispatch(joinedRoomsLoaded(rooms));
    }

    return rooms;
  };
};

export default useLoadJoinedRooms;
