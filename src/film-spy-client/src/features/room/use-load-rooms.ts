import { roomsLoadingStarted, roomsLoaded } from 'app-slice';
import client from 'client';
import { useAppDispatch } from 'hooks';
import type { Room } from 'models';

const useLoadRooms = (): () => Promise<void> => {
  const dispatch = useAppDispatch();

  return async (): Promise<void> => {
    dispatch(roomsLoadingStarted());

    let rooms: Room[] = [];

    try {
      rooms = (await client.get<Room[]>('/api/rooms')).data;
    } finally {
      dispatch(roomsLoaded(rooms));
    }
  };
};

export default useLoadRooms;
