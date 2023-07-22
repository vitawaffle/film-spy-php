import React from 'react';
import { useEffect } from 'react';
import { Card, CardContent, CircularProgress, Grid } from '@mui/material';

import { useLoadGame, selectGame, selectIsGameLoading, PlayerCard } from 'features/game';
import { useAppSelector } from 'hooks';
import type { Game as GameModel } from 'models';

const Game = (): JSX.Element => {
  const loadGame = useLoadGame();
  const game = useAppSelector(selectGame) as GameModel;
  const isGameLoading = useAppSelector(selectIsGameLoading);

  useEffect(() => {
    loadGame();
  }, []);

  return isGameLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              {game.users.map((user, i) => <PlayerCard key={i} user={user} />)}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Game;
