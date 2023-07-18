import React, { useEffect } from 'react';

import useListenRoomsChannel from './use-listen-rooms-channel';

const RoomsChannelListener = (): JSX.Element => {
  const { listenRoomsChannel, stopListeningRoomsChannel } = useListenRoomsChannel();

  useEffect(() => {
    listenRoomsChannel();
    return stopListeningRoomsChannel;
  }, []);

  return <></>;
};

export default RoomsChannelListener;
