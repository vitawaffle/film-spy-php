import React, { useEffect } from 'react';

import useListenRoomsChannel from './use-listen-rooms-channel';

const RoomsChannelListener = (): React.ReactElement => {
  const { listenRoomsChannel, stopListeningRoomsChannel } = useListenRoomsChannel();

  useEffect(() => {
    listenRoomsChannel();
    return stopListeningRoomsChannel;
  }, []);

  return <></>;
};

export default RoomsChannelListener;
