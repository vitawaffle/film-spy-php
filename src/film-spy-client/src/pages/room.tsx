import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import { selectUser } from 'app-slice';
import {
  selectCurrentRoom,
  useLoadUsers,
  UserList,
  DeleteRoomButton,
  LeaveRoomButton,
  RoomChannelListener,
} from 'features/room';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const Room = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const loadUsers = useLoadUsers();

  useEffect(() => {
    loadUsers();
  });

  const isRoomOwner = (): boolean => user?.id === currentRoom?.user.id;

  return (
    <>
      {currentRoom && <RoomChannelListener />}
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
