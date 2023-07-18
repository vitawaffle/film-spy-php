import client from 'client';
import { selectCurrentRoom, usersLoadingStarted, usersLoaded } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { User } from 'models';

const useLoadUsers = (): () => Promise<void> => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const loadUsers = async (): Promise<void> => {
    dispatch(usersLoadingStarted());

    let users: User[] = [];

    try {
      if (currentRoom)
        users = (await client.get<User[]>(`/api/rooms/${currentRoom.id}/users`)).data;
    } finally {
      dispatch(usersLoaded(users));
    }
  };

  return loadUsers;
};

export default useLoadUsers;
