import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { CreateRoomButton, RoomList, RoomsChannelListener } from 'features/rooms';
import { strings } from 'localization';

const Rooms = (): React.ReactElement => (
  <>
    <RoomsChannelListener />
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
              {strings.common.rooms}
            </Typography>
            <CreateRoomButton />
          </Box>
          <RoomList />
        </Stack>
      </CardContent>
    </Card>
  </>
);

export default Rooms;
