import React from 'react';

import OnceOnMountGuard from './once-on-mout-guard';
import { useCurrentRoomId } from 'features/room';
import { selectJoinedRooms } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const currentRoomId = useCurrentRoomId();
  const isEnabled = joinedRooms.find(room => room.id === currentRoomId) !== undefined;

  return (
    <OnceOnMountGuard isEnabled={isEnabled}>
      {children}
    </OnceOnMountGuard>
  );
};

export default HasRoom;
