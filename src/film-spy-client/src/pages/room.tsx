import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Grid, Card, CardContent, Stack, Typography } from '@mui/material';

import { selectRoom, selectUser } from 'app-slice';
import {
  useLoadUsers,
  UserList,
  DeleteRoomButton,
  LeaveRoomButton,
  RoomChannelListener,
  StartGameButton,
} from 'features/room';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const Room = (): ReactElement => {
  const user = useAppSelector(selectUser);
  const room = useAppSelector(selectRoom);
  const loadUsers = useLoadUsers();

  useEffect(() => {
    loadUsers();
  });

  const isRoomOwner = (): boolean => !!user && !!room && user.id === room.user.id;

  return (
    <>
      {room && <RoomChannelListener />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h3" component="h3">
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
              <Stack spacing={3}>
                {isRoomOwner() && <StartGameButton />}
                <LeaveRoomButton />
                {isRoomOwner() && <DeleteRoomButton />}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
