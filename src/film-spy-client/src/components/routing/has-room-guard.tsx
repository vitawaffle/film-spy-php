import React from 'react';

import Protected from './protected-guard';
import { selectRoom, selectIsCheckingAuthentication } from 'app-slice';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const HasRoomGuard = ({ children }: ChildrenProps): JSX.Element => {
  const room = useAppSelector(selectRoom);
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);

  return (
    <Protected isEnabled={isCheckingAuthentication || !!room} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default HasRoomGuard;
