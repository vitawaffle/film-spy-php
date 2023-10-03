import { useLocation, useParams } from 'react-router-dom';

const useCurrentRoomId = (): number => {
  const { pathname } = useLocation();
  const { id } = useParams();

  return pathname.startsWith('/rooms/') && id !== undefined ? parseInt(id) : 0;
};

export default useCurrentRoomId;
