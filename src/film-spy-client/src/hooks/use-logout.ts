import { useNavigate } from 'react-router-dom';

import { startedLoggingOut, loggedOut } from 'app-slice';
import client from 'client';
import { loggedOut as roomLoggedOut } from 'features/room';
import { useAppDispatch, useCheckAuthentication } from 'hooks';

const useLogout = (): () => Promise<void> => {
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async (): Promise<void> => {
    dispatch(startedLoggingOut());

    try {
      await client.post('/logout');
      await checkAuthentication();
      navigate('/home');
    } finally {
      dispatch(loggedOut());
      dispatch(roomLoggedOut());
    }
  };

  return logout;
};

export default useLogout;
