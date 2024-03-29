import React from 'react';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Card, CardContent, CircularProgress, Grid, Stack, Typography } from '@mui/material';

import { selectGame, selectIsGameLoading } from 'app-slice';
import { useLoadGame, PlayerCard } from 'features/game';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const Game = (): ReactElement => {
  const loadGame = useLoadGame();
  const game = useAppSelector(selectGame);
  const isGameLoading = useAppSelector(selectIsGameLoading);

  useEffect(() => {
    void loadGame();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h3" component="h3">
                {strings.common.players}
              </Typography>
              {(isGameLoading || !game) ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={1}>
                  {game?.users?.map((user, i) => <PlayerCard key={i} user={user} />)}
                </Grid>
              )}
            </Stack>
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
