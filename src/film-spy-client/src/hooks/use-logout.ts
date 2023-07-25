import { useNavigate } from 'react-router-dom';

import { startedLoggingOut, loggedOut } from 'app-slice';
import client from 'client';
import { useAppDispatch, useCheckAuthentication } from 'hooks';

const useLogout = (): () => Promise<void> => {
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return async (): Promise<void> => {
    dispatch(startedLoggingOut());

    try {
      await client.post('/logout');
      await checkAuthentication();
      navigate('/home');
    } finally {
      dispatch(loggedOut());
    }
  };
};

export default useLogout;
