import client from 'client';
import { useCheckAuthentication } from 'hooks';
import { useNavigate } from 'react-router-dom';

const useLogout = (setIsLoading?: (isLoading: boolean) => void) => {
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const logout = async () => {
    if (setIsLoading)
      setIsLoading(true);

    try {
      await client.post('/logout');

      await checkAuthentication();

      navigate('/home');
    } finally {
      if (setIsLoading)
        setIsLoading(false);
    }
  };

  return logout;
};

export default useLogout;
