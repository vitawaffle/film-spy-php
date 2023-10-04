import { ownedRoomsLoadingStarted, ownedRoomsLoaded } from './rooms-slice';
import client from 'client';
import type { Room } from 'models';
import { useDispatch } from 'store';

const useLoadOwnedRooms = (): () => Promise<Room[]> => {
  const dispatch = useDispatch();

  return async (): Promise<Room[]> => {
    dispatch(ownedRoomsLoadingStarted());

    let rooms: Room[] = [];

    try {
      rooms = (await client.get<Room[]>('/api/rooms/owned')).data;
    } finally {
      dispatch(ownedRoomsLoaded(rooms));
    }

    return rooms;
  };
};

export default useLoadOwnedRooms;
