import React from 'react';
import type { ReactElement } from 'react';

import Protected from './protected-guard';
import { selectGame, selectIsGameLoading, selectIsCheckingAuthentication } from 'app-slice';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const HasGameGuard = ({ children }: ChildrenProps): ReactElement => {
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);
  const isGameLoading = useAppSelector(selectIsGameLoading);
  const game = useAppSelector(selectGame);

  return (
    <Protected isEnabled={isCheckingAuthentication || isGameLoading || !!game} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default HasGameGuard;
