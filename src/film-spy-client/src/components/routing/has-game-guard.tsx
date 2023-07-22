import React from 'react';

import Protected from './protected-guard';
import { selectGame } from 'features/game';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const HasGameGuard = ({ children }: ChildrenProps): JSX.Element => {
  const game = useAppSelector(selectGame);

  return (
    <Protected isEnabled={!!game} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default HasGameGuard;
