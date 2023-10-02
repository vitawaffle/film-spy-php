import { roomsLoadingStarted, roomsLoaded, selectIsRoomsLoaded, selectRooms } from './rooms-slice';
import client from 'client';
import type { Room } from 'models';
import { useDispatch, useSelector } from 'store';

const useLoadRooms = (): () => Promise<Room[]> => {
  const isLoaded = useSelector(selectIsRoomsLoaded);
  const loadedRooms = useSelector(selectRooms);
  const dispatch = useDispatch();

  return async (): Promise<Room[]> => {
    if (isLoaded)
      return loadedRooms;

    dispatch(roomsLoadingStarted());

    let rooms: Room[] = [];

    try {
      rooms = (await client.get('/api/rooms')).data;
    } finally {
      dispatch(roomsLoaded(rooms));
    }

    return rooms;
  };
};

export default useLoadRooms;
