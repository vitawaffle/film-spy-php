import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import type { RoomCreated, RoomDeleted, UserKicked } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { ownedRoomCreated, roomCreated, roomDeleted, roomKicked } from 'features/rooms';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

export const useListenCommonChannel = (): {
  listenCommonChannel: () => void,
  stopListeningCommonChannel: () => void,
} => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const handleRoomCreated = ({ room }: RoomCreated): void => {
    /* Debug */
    console.log('Room created');
    /* ***** */

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
    listenCommonChannel: (): void => {
      /* Debug */
      console.log('Start listening rooms channel');
      /* ***** */

      window.Echo.private('common')
        .listen('RoomCreated', handleRoomCreated)
        .listen('RoomDeleted', handleRoomDeleted)
        .listen('UserKicked', handleUserKicked);
    },
    stopListeningCommonChannel: (): void => {
      /* Debug */
      console.log('End listening rooms channel');
      /* ***** */

      window.Echo.private('common')
        .stopListening('RoomCreated')
        .stopListening('RoomDeleted')
        .stopListening('UserKicked');
    },
  };
};

const CommonChannelListener = (): React.ReactElement => {
  const { listenCommonChannel, stopListeningCommonChannel } = useListenCommonChannel();

  useEffect(() => {
    listenCommonChannel();
    return stopListeningCommonChannel;
  }, []);

  return <></>;
};

export default CommonChannelListener;
