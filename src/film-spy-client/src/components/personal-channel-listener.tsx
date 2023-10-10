import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import type { GameStarted, UserKicked } from 'broadcast-events';
import { selectUser } from 'features/auth';
import { gameStarted } from 'features/games';
import { roomKicked } from 'features/rooms';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

export const useListenPersonalChannel = (): {
  listenPersonalChannel: () => void,
  stopListeningPersonalChannel: () => void,
} => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const handleUserKicked = ({ room }: UserKicked): void => {
    enqueueSnackbar(`${room.name} - ${strings.snack.youAreKicked}`);
    dispatch(roomKicked(room));
  };

  const handleGameStarted = ({ game }: GameStarted): void => {
    enqueueSnackbar(`${game.name} - ${strings.snack.gameStarted}`);
    dispatch(gameStarted(game));
  };

  const url = `personal.${currentUser?.id ?? '0'}`;

  return {
    listenPersonalChannel: (): void => {
      /* Debug */
      console.log('Start listening personal channel');
      /* ***** */

      window.Echo.private(url)
        .listen('UserKicked', handleUserKicked)
        .listen('GameStarted', handleGameStarted);
    },
    stopListeningPersonalChannel: (): void => {
      /* Debug */
      console.log('End listening personal channel');
      /* ***** */

      window.Echo.private(url)
        .stopListening('UserKicked')
        .stopListening('GameStarted');
    },
  };
};

const PersonalChannelListener = (): React.ReactElement => {
  const { listenPersonalChannel, stopListeningPersonalChannel } = useListenPersonalChannel();

  useEffect(() => {
    listenPersonalChannel();
    return stopListeningPersonalChannel;
  }, []);

  return <></>;
};

export default PersonalChannelListener;
