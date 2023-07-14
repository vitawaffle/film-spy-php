import { useAppDispatch } from 'hooks';
import {
  startedAuthenticating,
  authenticated,
  endedAuthenticating,
  loggedOut,
} from 'app-slice';
import client from 'client';
import { isUnauthenticatedError } from 'utils';
import { User } from 'models';
import { roomJoined } from 'features/room';

const useCheckAuthentication = () => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    dispatch(startedAuthenticating());

    try {
      const user = (await client.get<User>('/api/users/me')).data;

      if (user.room)
        dispatch(roomJoined(user.room));

      dispatch(authenticated(user));
      return true;
    } catch (error: unknown) {
      if (isUnauthenticatedError(error)) {
        dispatch(loggedOut());
        return false;
      }

      throw error;
    } finally {
      dispatch(endedAuthenticating());
    }
  };

  return checkAuthentication;
};

export default useCheckAuthentication;
