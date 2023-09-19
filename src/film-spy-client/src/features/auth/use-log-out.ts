import { useNavigate } from 'react-router-dom';

import { logOutStarted, loggedOut } from './auth-slice';
import useCheckAuthentication from './use-check-authentication';
import client from 'client';
import { useDispatch } from 'store';

const useLogOut = (): () => Promise<void> => {
  const dispatch = useDispatch();
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  return async (): Promise<void> => {
    dispatch(logOutStarted());

    try {
      await client.post('/logout');
      await checkAuthentication();
      navigate('/home');
    } finally {
      dispatch(loggedOut());
    }
  };
};

export default useLogOut;
