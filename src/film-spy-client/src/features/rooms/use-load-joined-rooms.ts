import { joinedRoomsLoadingStarted, joinedRoomsLoaded } from './rooms-slice';
import client from 'client';
import type { Room } from 'models';
import { useDispatch } from 'store';

const useLoadJoinedRooms = (): () => Promise<Room[]> => {
  const dispatch = useDispatch();

  return async (): Promise<Room[]> => {
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
