import React from 'react';
import { useParams } from 'react-router-dom';

import Guard from './guard';
import { selectJoinedRooms } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const { id } = useParams();

  const isHasRoom = (id !== undefined)
    && (joinedRooms.find(room => room.id === parseInt(id)) !== undefined);

  return (
    <Guard isEnabled={isHasRoom}>
      {children}
    </Guard>
  );
};

export default HasRoom;
