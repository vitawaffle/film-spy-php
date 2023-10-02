import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

import { userJoined, userKicked, userLeft } from './room-slice';
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

  const handleRoomDeleted = (): void => {
    enqueueSnackbar(strings.snack.roomDeleted);

    navigate('/rooms');
  };

  const handleUserJoinedRoom = ({ user }: UserJoinedRoom): void => {
    dispatch(userJoined(user));
  };

  const handleUserLeftRoom = ({ user }: UserLeftRoom): void => {
    dispatch(userLeft(user));
  };

  const handleUserKicked = ({ room, user }: UserKicked): void => {
    dispatch(userKicked(user));

    if (currentUser?.id === user.id) {
      enqueueSnackbar(strings.snack.youAreKicked);

      dispatch(roomKicked(room));
      navigate('/rooms');
    }
  };

  const { id } = useParams();
  const url = `rooms.${id}`;

  return {
    listenRoomChannel: (): void => {
      window.Echo.private(url)
        .listen('RoomDeleted', handleRoomDeleted)
        .listen('UserJoinedRoom', handleUserJoinedRoom)
        .listen('UserLeftRoom', handleUserLeftRoom)
        .listen('UserKicked', handleUserKicked);
    },
    stopListeningRoomChannel: (): void => {
      window.Echo.private(url)
        .stopListening('RoomDeleted')
        .stopListening('UserJoinedRoom')
        .stopListening('UserLeftRoom')
        .stopListening('UserKicked');
    },
  };
};

export default useListenRoomChannel;
