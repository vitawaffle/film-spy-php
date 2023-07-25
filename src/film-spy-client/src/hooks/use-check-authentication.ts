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

  const checkAuthentication = async (): Promise<boolean> => {
    dispatch(startedAuthenticating());

    try {
      const user = (await client.get<User>('/api/users/me')).data;

      dispatch(endedAuthenticating(user));

      return true;
    } catch (error: unknown) {
      if (isUnauthenticatedError(error)) {
        endedAuthenticating(undefined);

        return false;
      }

      throw error;
    }
  };

  return checkAuthentication;
};

export default useCheckAuthentication;
