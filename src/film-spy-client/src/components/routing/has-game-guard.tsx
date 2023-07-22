import React from 'react';

import Protected from './protected-guard';
import { selectGame, selectIsGameLoading } from 'features/game';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const HasGameGuard = ({ children }: ChildrenProps): JSX.Element => {
  const game = useAppSelector(selectGame);
  const isGameLoading = useAppSelector(selectIsGameLoading);

  return (
    <Protected isEnabled={isGameLoading || !!game} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default HasGameGuard;
