import React from 'react';
import { List, Typography } from '@mui/material';

import GameListItem from './game-list-item';
import { selectGames } from './games-slice';
import { strings } from 'localization';
import { useSelector } from 'store';

const GameList = (): React.ReactElement => {
  const games = useSelector(selectGames);
  const isEmpty = games.length === 0;

  return isEmpty ? (
    <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
      {strings.features.games.gameList.empty}
    </Typography>
  ) : (
    <List>
      {games.map((game, i) => <GameListItem game={game} number={i + 1} key={i} />)}
    </List>
  );
};

export default GameList;
