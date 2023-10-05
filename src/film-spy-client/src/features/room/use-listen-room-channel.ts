import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { userJoined, userKicked, userLeft } from './room-slice';
import useCurrentRoomId from './use-current-room-id';
import type { UserJoinedRoom, UserKicked, UserLeftRoom } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

const useListenRoomChannel = (): { listenRoomChannel: () => void, stopListeningRoomChannel: () => void } => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    enqueueSnackbar(`${user.name} - ${strings.snack.userJoined}`);
    dispatch(userJoined(user));
  };

  const handleUserLeftRoom = ({ user }: UserLeftRoom): void => {
    enqueueSnackbar(`${user.name} - ${strings.snack.userLeft}`);
    dispatch(userLeft(user));
  };

  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  const handleUserKicked = ({ user }: UserKicked): void => {
    enqueueSnackbar(`${user.name} - ${strings.snack.userKicked}`);
    dispatch(userKicked(user));

    if (currentUser?.id === user.id)
      navigate('/rooms');
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
