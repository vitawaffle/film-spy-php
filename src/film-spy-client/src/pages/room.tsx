import React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { RoomChannelListener, UserList } from 'features/room';
import { strings } from 'localization';

const Room = (): React.ReactElement => (
  <>
    <RoomChannelListener />
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
  </>
);

export default Room;
