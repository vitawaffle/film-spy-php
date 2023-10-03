import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { selectJoinedRooms } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const { id } = useParams();
  const roomId = parseInt(id ?? '0');
  const isEnabled = joinedRooms.find(room => room.id === roomId) !== undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEnabled)
      navigate('/errors/forbidden');
  }, []);

  return <>{isEnabled && children}</>;
};

export default HasRoom;
