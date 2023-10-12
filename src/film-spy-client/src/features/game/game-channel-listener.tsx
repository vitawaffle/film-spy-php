import React, { useEffect } from 'react';

import useListenGameChannel from './use-listen-game-channel';

const GameChannelListener = (): React.ReactElement => {
  const { listenGameChannel, stopListeningGameChannel } = useListenGameChannel();

  useEffect(() => {
    listenGameChannel();
    return stopListeningGameChannel;
  }, []);

  return <></>;
};

export default GameChannelListener;
