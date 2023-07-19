import React from 'react';

import Protected from './protected-guard';
import { selectCurrentRoom } from 'features/room';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const HasRoomGuard = ({ children }: ChildrenProps): JSX.Element => {
  const currentRoom = useAppSelector(selectCurrentRoom);

  return (
    <Protected isEnabled={!!currentRoom} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default HasRoomGuard;
