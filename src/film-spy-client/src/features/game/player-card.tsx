import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

import type { User } from 'models';

export type PlayerCardProps = {
  user: User,
};

const PlayerCard = ({ user }: PlayerCardProps): JSX.Element => {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {user.name ?? user.email}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PlayerCard;
