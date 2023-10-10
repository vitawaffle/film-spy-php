import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { GameList } from 'features/games';
import { strings } from 'localization';

const Games = (): React.ReactElement => (
  <Card>
    <CardContent>
      <Stack spacing={2}>
        <Typography variant="h3" component="h3">
          {strings.common.games}
        </Typography>
        <GameList />
      </Stack>
    </CardContent>
  </Card>
);

export default Games;
