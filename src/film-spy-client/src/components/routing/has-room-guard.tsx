import React from 'react';

import Protected from './protected-guard';
import { selectIsCheckingAuthentication } from 'app-slice';
import { selectCurrentRoom } from 'features/room';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const HasRoomGuard = ({ children }: ChildrenProps): JSX.Element => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);

  return (
    <Protected isEnabled={isCheckingAuthentication || !!currentRoom} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default HasRoomGuard;
