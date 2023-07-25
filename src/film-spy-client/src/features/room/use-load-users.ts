import { selectRoom } from 'app-slice';
import client from 'client';
import { usersLoadingStarted, usersLoaded } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { User } from 'models';

const useLoadUsers = (): () => Promise<void> => {
  const dispatch = useAppDispatch();
  const room = useAppSelector(selectRoom);

  const loadUsers = async (): Promise<void> => {
    dispatch(usersLoadingStarted());

    let users: User[] = [];

    try {
      if (room)
        users = (await client.get<User[]>(`/api/rooms/${room.id}/users`)).data;
    } finally {
      dispatch(usersLoaded(users));
    }
  };

  return loadUsers;
};

export default useLoadUsers;
