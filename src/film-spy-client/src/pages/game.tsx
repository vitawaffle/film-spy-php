import React from 'react';
import { useEffect } from 'react';
import { Card, CardContent, CircularProgress, Grid } from '@mui/material';

import { selectGame, selectIsGameLoading } from 'app-slice';
import { useLoadGame, PlayerCard } from 'features/game';
import { useAppSelector } from 'hooks';

const Game = (): JSX.Element => {
  const loadGame = useLoadGame();
  const game = useAppSelector(selectGame);
  const isGameLoading = useAppSelector(selectIsGameLoading);

  useEffect(() => {
    void loadGame();
  }, []);

  return (isGameLoading || !game) ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              {game?.users?.map((user, i) => <PlayerCard key={i} user={user} />)}
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
