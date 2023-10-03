import { usersLoadingStarted, usersLoaded } from './room-slice';
import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import type { User } from 'models';
import { useDispatch } from 'store';

const useLoadUsers = (): () => Promise<User[]> => {
  const dispatch = useDispatch();
  const roomId = useCurrentRoomId();

  return async (): Promise<User[]> => {
    dispatch(usersLoadingStarted());

    let users: User[] = [];

    try {
      users = (await client.get<User[]>(`/api/rooms/${roomId}/users`)).data;
    } finally {
      dispatch(usersLoaded(users));
    }

    return users;
  };
};

export default useLoadUsers;
