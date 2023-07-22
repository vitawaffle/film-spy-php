import {
  startedAuthenticating,
  authenticated,
  endedAuthenticating,
  loggedOut,
} from 'app-slice';
import client from 'client';
import { gameLoaded } from 'features/game';
import { roomJoined } from 'features/room';
import { useAppDispatch } from 'hooks';
import { isUnauthenticatedError } from 'utils';
import type { User } from 'models';

const useCheckAuthentication = (): () => Promise<boolean> => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async (): Promise<boolean> => {
    dispatch(startedAuthenticating());

    try {
      const user = (await client.get<User>('/api/users/me')).data;

      if (user.room)
        dispatch(roomJoined(user.room));

      if (user.game)
        dispatch(gameLoaded(user.game));

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
