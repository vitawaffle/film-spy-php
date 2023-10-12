import React from 'react';
import Grid from '@mui/material/Grid';

import { GameChannelListener, UserPad } from 'features/game';

const Game = (): React.ReactElement => (
  <>
    <GameChannelListener />
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <UserPad />
      </Grid>
      <Grid item xs={12} md={6} />
    </Grid>
  </>
);

export default Game;
