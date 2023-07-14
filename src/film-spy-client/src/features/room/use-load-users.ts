import client from 'client';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectCurrentRoom, usersLoadingStarted, usersLoaded } from 'features/room';
import { User, Room } from 'models';

const useLoadUsers = () => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom) as Room;

  const loadUsers = async () => {
    dispatch(usersLoadingStarted());

    let users: User[] = [];

    try {
      users = (await client.get<User[]>(
        `/api/rooms/${currentRoom.id}/users`,
      )).data;
    } finally {
      dispatch(usersLoaded(users));
    }
  };

  return loadUsers;
};

export default useLoadUsers;
