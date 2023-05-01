import { useAppDispatch } from 'hooks';
import { authenticate, unauthenticate } from 'app-slice';
import client from 'client';
import { isUnauthenticatedError } from 'utils';

const useCheckAuthentication = () => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    try {
      await client.get('/api/user');

      dispatch(authenticate());

      return true;
    } catch (error: unknown) {
      if (isUnauthenticatedError(error)) {
        dispatch(unauthenticate());

        return false;
      }

      throw error;
    }
  };

  return checkAuthentication;
};

export default useCheckAuthentication;
