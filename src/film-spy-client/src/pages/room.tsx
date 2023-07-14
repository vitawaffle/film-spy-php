import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { strings } from 'localization';
import {
  useLoadUsers,
  UserList,
  DeleteRoomButton,
  LeaveRoomButton,
} from 'features/room';
import { selectUser } from 'app-slice';
import { useAppSelector } from 'hooks';
import { selectCurrentRoom } from 'features/room';

const Room = () => {
  const loadUsers = useLoadUsers();
  const user = useAppSelector(selectUser);
  const currentRoom = useAppSelector(selectCurrentRoom);

  useEffect(() => {
    loadUsers();

    window.Echo.private(`rooms.${currentRoom?.id ?? 0}`)
      .listen('JoinRoom', (event: unknown) => {
        console.log(event);
      })
      .listen('LeaveRoom', (event: unknown) => {
        console.log(event);
      })
      .listen('DeleteRoom', (event: unknown) => {
        console.log(event);
      });
  }, []);

  const isRoomOwner = () => user?.id === currentRoom?.user_id;

  return (
    <>
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
