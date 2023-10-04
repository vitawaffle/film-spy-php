import React, { useEffect } from 'react';

import Guard from './guard';
import { useCurrentRoomId } from 'features/room';
import { selectIsJoinedRoomsLoading, selectJoinedRooms, useLoadJoinedRooms } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const loadJoinedRooms = useLoadJoinedRooms();

  useEffect(() => {
    void loadJoinedRooms();
  }, []);

  const isJoinedRoomsLoading = useSelector(selectIsJoinedRoomsLoading);
  const joinedRooms = useSelector(selectJoinedRooms);
  const currentRoomId = useCurrentRoomId();
  const isEnabled = joinedRooms.find(room => room.id === currentRoomId) !== undefined;

  return (
    <Guard isEnabled={isEnabled} isLoading={isJoinedRoomsLoading}>
      {children}
    </Guard>
  );
};

export default HasRoom;
