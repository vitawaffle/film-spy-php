import { useNavigate, useParams } from 'react-router-dom';

import { userJoined, userLeft } from './room-slice';
import type { UserJoinedRoom, UserLeftRoom } from 'broadcast-events';
import { useDispatch } from 'store';

const useListenRoomChannel = (): { listenRoomChannel: () => void, stopListeningRoomChannel: () => void } => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoomDeleted = (): void => {
    // TODO add feedback about room deletion

    navigate('/rooms');
  };

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    dispatch(userJoined(user));
  };

  const handleUserLeftRoom = ({ user }: UserLeftRoom): void => {
    dispatch(userLeft(user));
  };

  const { id } = useParams();
  const url = `rooms.${id}`;

  return {
    listenRoomChannel: (): void => {
      window.Echo.private(url)
        .listen('RoomDeleted', handleRoomDeleted)
        .listen('UserJoinedRoom', handleUserJoinedRoom)
        .listen('UserLeftRoom', handleUserLeftRoom);
    },
    stopListeningRoomChannel: (): void => {
      window.Echo.private(url)
        .stopListening('RoomDeleted')
        .stopListening('UserJoinedRoom')
        .stopListening('UserLeftRoom');
    },
  };
};

export default useListenRoomChannel;
