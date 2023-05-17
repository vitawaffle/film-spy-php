import client from 'client';
import { useCheckAuthentication } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks';
import { setIsLoggingOut } from 'app-slice';

const useLogout = () => {
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(setIsLoggingOut(true));

    try {
      await client.post('/logout');

      await checkAuthentication();

      navigate('/home');
    } finally {
      dispatch(setIsLoggingOut(false));
    }
  };

  return logout;
};

export default useLogout;
