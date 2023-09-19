import { authenticationCheckStarted, authenticated, unauthenticated } from './auth-slice';
import client from 'client';
import type { User } from 'models';
import { useDispatch } from 'store';
import { isUnauthenticatedError } from 'utils';

const useCheckAuthentication = (): () => Promise<boolean> => {
  const dispatch = useDispatch();

  return async (): Promise<boolean> => {
    dispatch(authenticationCheckStarted());

    try {
      dispatch(authenticated((await client.get<User>('/api/users/me')).data));
      return true;
    } catch (error: unknown) {
      dispatch(unauthenticated());

      if (isUnauthenticatedError(error))
        return false;

      throw error;
    }
  };
};

export default useCheckAuthentication;
