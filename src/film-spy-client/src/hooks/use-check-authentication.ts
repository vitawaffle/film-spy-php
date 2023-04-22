import { useAppDispatch } from 'hooks';
import { authenticate, unauthenticate } from 'app-slice';
import client from 'client';

const useCheckAuthentication = () => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    try {
      await client.get('/api/user');

      dispatch(authenticate());

      return true;
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(unauthenticate());

        return false;
      }

      throw error;
    }
  };

  return checkAuthentication;
};

export default useCheckAuthentication;
