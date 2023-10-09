import React from 'react';
import { List, Typography } from '@mui/material';

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
    </List>
  );
};

export default GameList;
