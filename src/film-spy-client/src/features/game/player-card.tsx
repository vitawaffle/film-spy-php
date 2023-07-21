import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import type { User } from 'models';

export type PlayerCardProps = {
  user: User,
};

const PlayerCard = ({ user }: PlayerCardProps): JSX.Element => {
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent></CardContent>
      </Card>
    </Grid>
  );
};

export default PlayerCard;
