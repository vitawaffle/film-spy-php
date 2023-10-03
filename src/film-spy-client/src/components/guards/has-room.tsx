import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCurrentRoomId } from 'features/room';
import { navigatedAfterDeletion, selectJoinedRooms, selectLastDeletedRoomId } from 'features/rooms';
import type { ChildrenProps } from 'props';
import { useDispatch, useSelector } from 'store';

const HasRoom = ({ children }: ChildrenProps): React.ReactElement => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const roomId = useCurrentRoomId();
  const isEnabled = joinedRooms.find(room => room.id === roomId) !== undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEnabled)
      navigate('/errors/forbidden');
  }, []);

  const lastDeletedRoomId = useSelector(selectLastDeletedRoomId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastDeletedRoomId === roomId) {
      navigate('/rooms');
      dispatch(navigatedAfterDeletion());
    }
  }, [lastDeletedRoomId]);

  return <>{isEnabled && children}</>;
};

export default HasRoom;
