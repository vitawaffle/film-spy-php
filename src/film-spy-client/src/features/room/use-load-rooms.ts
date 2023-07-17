import client from 'client';
import { roomsLoadingStarted, roomsLoaded } from 'features/room';
import { useAppDispatch } from 'hooks';
import type { Room } from 'models';

const useLoadRooms = (): () => Promise<void> => {
  const dispatch = useAppDispatch();

  const loadRooms = async (): Promise<void> => {
    dispatch(roomsLoadingStarted());

    let rooms: Room[] = [];

    try {
      rooms = (await client.get<Room[]>('/api/rooms')).data;
    } finally {
      dispatch(roomsLoaded(rooms));
    }
  };

  return loadRooms;
};

export default useLoadRooms;
