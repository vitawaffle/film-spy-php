import { useLocation, useParams } from 'react-router-dom';

const useCurrentGameId = (): number => {
  const { pathname } = useLocation();
  const { id } = useParams();

  return pathname.startsWith('/games/') && id !== undefined ? parseInt(id) : 0;
};

export default useCurrentGameId;
