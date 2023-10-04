import { useSnackbar } from 'notistack';

import { roomCreated, roomDeleted, roomKicked } from './rooms-slice';
import type { RoomCreated, RoomDeleted, UserKicked } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

const useListenRoomsChannel = (): { listenRoomsChannel: () => void, stopListeningRoomsChannel: () => void } => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const { enqueueSnackbar } = useSnackbar();

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    dispatch(roomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    dispatch(roomDeleted(room));
  };

  const handleUserKicked = ({ room, user }: UserKicked): void => {
    if (currentUser?.id === user.id) {
      enqueueSnackbar(`${strings.snack.youAreKicked}: ${room.name}`);
      dispatch(roomKicked(room));
    }
  };

  return {
    listenRoomsChannel: (): void => {
      /* Debug */
      console.log('Start listening rooms channel');
      /* ***** */

      window.Echo.private('rooms')
        .listen('RoomCreated', handleRoomCreated)
        .listen('RoomDeleted', handleRoomDeleted)
        .listen('UserKicked', handleUserKicked);
    },
    stopListeningRoomsChannel: (): void => {
      /* Debug */
      console.log('End listening rooms channel');
      /* ***** */

      window.Echo.private('rooms')
        .stopListening('RoomCreated')
        .stopListening('RoomDeleted')
        .stopListening('UserKicked');
    },
  };
};

export default useListenRoomsChannel;
