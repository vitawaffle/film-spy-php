import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { userJoined, userKicked, userLeft } from './room-slice';
import useCurrentRoomId from './use-current-room-id';
import type { UserJoinedRoom, UserKicked, UserLeftRoom } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { roomKicked } from 'features/rooms';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

const useListenRoomChannel = (): { listenRoomChannel: () => void, stopListeningRoomChannel: () => void } => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    dispatch(userJoined(user));
  };

  const handleUserLeftRoom = ({ user }: UserLeftRoom): void => {
    dispatch(userLeft(user));
  };

  const handleUserKicked = ({ user }: UserKicked): void => {
    dispatch(userKicked(user));

    if (currentUser?.id === user.id) {
      enqueueSnackbar(strings.snack.youAreKicked);
      navigate('/rooms');
    }
  };

  const handleRoomDeleted = (): void => {
    navigate('/rooms');
  };

  const roomId = useCurrentRoomId();
  const url = `rooms.${roomId}`;

  return {
    listenRoomChannel: (): void => {
      /* Debug */
      console.log(`Start listening ${url} channel`);
      /* ***** */

      window.Echo.private(url)
        .listen('UserJoinedRoom', handleUserJoinedRoom)
        .listen('UserLeftRoom', handleUserLeftRoom)
        .listen('UserKicked', handleUserKicked)
        .listen('RoomDeleted', handleRoomDeleted);
    },
    stopListeningRoomChannel: (): void => {
      /* Debug */
      console.log(`End listening ${url} channel`);
      /* ***** */

      window.Echo.private(url)
        .stopListening('UserJoinedRoom')
        .stopListening('UserLeftRoom')
        .stopListening('UserKicked')
        .stopListening('RoomDeleted');
    },
  };
};

export default useListenRoomChannel;
