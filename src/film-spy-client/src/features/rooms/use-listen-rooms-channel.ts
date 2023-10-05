import { useSnackbar } from 'notistack';

import { ownedRoomCreated, roomCreated, roomDeleted, roomKicked } from './rooms-slice';
import type { RoomCreated, RoomDeleted, UserKicked } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

const useListenRoomsChannel = (): { listenRoomsChannel: () => void, stopListeningRoomsChannel: () => void } => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    enqueueSnackbar(`${room.name} - ${strings.snack.roomCreated}`);
    dispatch(roomCreated(room));

    if (currentUser?.id === room.owner.id)
      dispatch(ownedRoomCreated(room));
  };

  const handleRoomDeleted = ({ room }: RoomDeleted): void => {
    enqueueSnackbar(`${room.name} - ${strings.snack.roomDeleted}`);
    dispatch(roomDeleted(room));
  };

  const handleUserKicked = ({ user, room }: UserKicked): void => {
    if (currentUser?.id === user.id) {
      enqueueSnackbar(`${room.name} - ${strings.snack.youAreKicked}`);
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
        .listen('RoomDeleted', handleRoomDeleted);
    },
    stopListeningRoomsChannel: (): void => {
      /* Debug */
      console.log('End listening rooms channel');
      /* ***** */

      window.Echo.private('rooms')
        .stopListening('RoomCreated')
        .stopListening('RoomDeleted');
    },
  };
};

export default useListenRoomsChannel;
