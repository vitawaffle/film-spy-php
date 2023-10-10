import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import type { RoomCreated, RoomDeleted } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { ownedRoomCreated, roomCreated, roomDeleted } from 'features/rooms';
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

  return {
    listenCommonChannel: (): void => {
      /* Debug */
      console.log('Start listening common channel');
      /* ***** */

      window.Echo.private('common')
        .listen('RoomCreated', handleRoomCreated)
        .listen('RoomDeleted', handleRoomDeleted);
    },
    stopListeningCommonChannel: (): void => {
      /* Debug */
      console.log('End listening common channel');
      /* ***** */

      window.Echo.private('common')
        .stopListening('RoomCreated')
        .stopListening('RoomDeleted');
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
