import React, { useEffect } from 'react';
import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

import { useIsRoomOwner } from 'features/room';
import { DeleteRoomButton, LeaveRoomButton, RoomChannelListener, UserList } from 'features/room';
import { useLoadOwnedRooms } from 'features/rooms';
import { strings } from 'localization';

const Room = (): React.ReactElement => {
  const isRoomOwner = useIsRoomOwner();

  const loadOwnedRooms = useLoadOwnedRooms();

  useEffect(() => {
    void loadOwnedRooms();
  }, []);

  return (
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
                <LeaveRoomButton />
                {isRoomOwner && (
                  <>
                    <Divider variant="middle" />
                    <DeleteRoomButton />
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
