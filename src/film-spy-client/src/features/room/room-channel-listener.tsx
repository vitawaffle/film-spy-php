import React, { useEffect } from 'react';

import useListenRoomChannel from './use-listen-room-channel';

const RoomChannelListener = (): React.ReactElement => {
  const { listenRoomChannel, stopListeningRoomChannel } = useListenRoomChannel();

  useEffect(() => {
    listenRoomChannel();
    return stopListeningRoomChannel;
  }, []);

  return <></>;
};

export default RoomChannelListener;
