import React from 'react';
import { useParams } from 'react-router-dom';

import Guard from './guard';
import { selectIsJoinedRoomsLoading, selectJoinedRooms } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const { id } = useParams();
  const isJoinedRoomsLoading = useSelector(selectIsJoinedRoomsLoading);
  const joinedRooms = useSelector(selectJoinedRooms);

  const isHasRoom = joinedRooms.find(room => room.id === parseInt(id ?? '')) !== undefined;

  return isJoinedRoomsLoading ? <></> : (
    <Guard isEnabled={isHasRoom} navigateOnForbidden="/errors/forbidden">
      {children}
    </Guard>
  );
};

export default HasRoom;
