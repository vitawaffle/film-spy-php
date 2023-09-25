import { useParams } from 'react-router-dom';

import { userJoined } from './room-slice';
import type { UserJoinedRoom } from 'broadcast-events';
import { useDispatch } from 'store';

const useListenRoomChannel = (): { listenRoomChannel: () => void, stopListeningRoomChannel: () => void } => {
  const dispatch = useDispatch();

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    dispatch(userJoined(user));
  };

  const { id } = useParams();

  return {
    listenRoomChannel: (): void => {
      window.Echo.private(`rooms.${id}`).listen('UserJoinedRoom', handleUserJoinedRoom);
    },
    stopListeningRoomChannel: (): void => {
      window.Echo.private(`rooms.${id}`).stopListening('UserJoinedRoom');
    },
  };
};

export default useListenRoomChannel;
