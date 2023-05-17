import { useAppDispatch } from 'hooks';
import {
  authenticate,
  unauthenticate,
  setUser,
  setIsCheckingAuthentication,
} from 'app-slice';
import client from 'client';
import { isUnauthenticatedError } from 'utils';
import { User } from 'models';

const useCheckAuthentication = () => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    dispatch(setIsCheckingAuthentication(true));

    try {
      const user = (await client.get<User>('/api/users/me')).data;

      dispatch(authenticate());
      dispatch(setUser(user));

      return true;
    } catch (error: unknown) {
      if (isUnauthenticatedError(error)) {
        dispatch(unauthenticate());

        return false;
      }

      throw error;
    } finally {
      dispatch(setIsCheckingAuthentication(false));
    }
  };

  return checkAuthentication;
};

export default useCheckAuthentication;
