import React, { useEffect } from 'react';

import useListenRoomsChannel from './use-listen-rooms-channel';

const RoomsChannelListener = (): JSX.Element => {
  const listenRoomsChannel = useListenRoomsChannel();

  useEffect(() => {
    listenRoomsChannel();
  }, []);

  return <></>;
};

export default RoomsChannelListener;
