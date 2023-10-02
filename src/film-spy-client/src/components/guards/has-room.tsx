import React from 'react';
import { useParams } from 'react-router-dom';

import Guard from './guard';
import { selectJoinedRooms } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const { id } = useParams();
  const roomId = parseInt(id ?? '0');
  const isEnabled = joinedRooms.find(room => room.id === roomId) !== undefined;

  return (
    <Guard isEnabled={isEnabled}>
      {children}
    </Guard>
  );
};

export default HasRoom;
