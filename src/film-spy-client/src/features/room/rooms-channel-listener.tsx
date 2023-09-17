import React, { useEffect } from 'react';
import type { ReactElement } from 'react';

import useListenRoomsChannel from './use-listen-rooms-channel';

const RoomsChannelListener = (): ReactElement => {
  const { listenRoomsChannel, stopListeningRoomsChannel } = useListenRoomsChannel();

  useEffect(() => {
    listenRoomsChannel();
    return stopListeningRoomsChannel;
  }, []);

  return <></>;
};

export default RoomsChannelListener;
