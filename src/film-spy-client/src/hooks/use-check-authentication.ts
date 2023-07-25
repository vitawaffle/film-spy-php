import {
  startedAuthenticating,
  endedAuthenticating,
} from 'app-slice';
import client from 'client';
import { useAppDispatch } from 'hooks';
import { isUnauthenticatedError } from 'utils';
import type { User } from 'models';

const useCheckAuthentication = (): () => Promise<boolean> => {
  const dispatch = useAppDispatch();

  return async (): Promise<boolean> => {
    dispatch(startedAuthenticating());

    try {
      const user = (await client.get<User>('/api/users/me')).data;

      dispatch(endedAuthenticating(user));

      return true;
    } catch (error: unknown) {
      dispatch(endedAuthenticating(undefined));

      if (isUnauthenticatedError(error))
        return false;

      throw error;
    }
  };
};

export default useCheckAuthentication;
