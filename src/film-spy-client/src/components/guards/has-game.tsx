import React from 'react';

import OnceOnMountGuard from './once-on-mout-guard';
import { useCurrentGameId } from 'features/game';
import { selectGames } from 'features/games';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const HasGame = ({ children }: ChildrenProps): React.ReactElement => {
  const games = useSelector(selectGames);
  const currentGameId = useCurrentGameId();
  const isEnabled = games.find(game => game.id === currentGameId) !== undefined;

  return (
    <OnceOnMountGuard isEnabled={isEnabled}>
      {children}
    </OnceOnMountGuard>
  );
};

export default HasGame;
