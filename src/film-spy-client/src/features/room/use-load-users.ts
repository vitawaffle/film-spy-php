import { useParams } from 'react-router-dom';

import { usersLoadingStarted, usersLoaded } from './room-slice';
import client from 'client';
import type { User } from 'models';
import { useDispatch } from 'store';

const useLoadUsers = (): () => Promise<User[]> => {
  const dispatch = useDispatch();
  const { id } = useParams();

  return async (): Promise<User[]> => {
    dispatch(usersLoadingStarted);

    let users: User[] = [];

    try {
      users = (await client.get<User[]>(`/api/rooms/${id}/users`)).data;
    } finally {
      dispatch(usersLoaded(users));
    }

    return users;
  };
};

export default useLoadUsers;
