import React from 'react';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';

import { DeleteRoomButton, RoomChannelListener, UserList } from 'features/room';
import { strings } from 'localization';

const Room = (): React.ReactElement => (
  <>
    <RoomChannelListener />
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
                {strings.common.players}
              </Typography>
              <UserList />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <DeleteRoomButton />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default Room;
