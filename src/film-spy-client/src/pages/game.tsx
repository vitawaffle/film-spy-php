import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import { PlayerCard } from 'features/game';

const Game = (): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={1}></Grid>
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
