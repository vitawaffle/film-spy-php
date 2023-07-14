import client from 'client';
import { useAppDispatch } from 'hooks';
import { roomsLoadingStarted, roomsLoaded } from 'features/room';
import { Room } from 'models';

const useLoadRooms = () => {
  const dispatch = useAppDispatch();

  const loadRooms = async () => {
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
