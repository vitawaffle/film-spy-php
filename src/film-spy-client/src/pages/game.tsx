import React, { useEffect } from 'react';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';

import { GameChannelListener, useLoadGame, UserList } from 'features/game';
import { strings } from 'localization';

const Game = (): React.ReactElement => {
  const loadGame = useLoadGame();

  useEffect(() => {
    void loadGame();
  }, []);

  return (
    <>
      <GameChannelListener />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h3" component="h3">
                  {strings.common.players}
                </Typography>
                <UserList />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} />
      </Grid>
    </>
  );
};

export default Game;
