import { roomsLoadingStarted, roomsLoaded } from './rooms-slice';
import client from 'client';
import type { Room } from 'models';
import { useDispatch } from 'store';

const useLoadRooms = (): () => Promise<Room[]> => {
  const dispatch = useDispatch();

  return async (): Promise<Room[]> => {
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
