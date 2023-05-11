import client from 'client';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsUsersLoading, setUsers } from 'features/room';
import { User } from 'models';
import { selectUser } from 'app-slice';

const useLoadUsers = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const loadUsers = async () => {
    dispatch(setIsUsersLoading(true));

    try {
      const users = (await client.get<User[]>(
        `/api/rooms/${user?.room?.id ?? 0}/users`,
      )).data;

      dispatch(setUsers(users));
    } finally {
      dispatch(setIsUsersLoading(false));
    }
  };

  return loadUsers;
};

export default useLoadUsers;
