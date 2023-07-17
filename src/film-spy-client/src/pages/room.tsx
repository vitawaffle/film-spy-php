import React from 'react';
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
  UserList,
  DeleteRoomButton,
  LeaveRoomButton,
} from 'features/room';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const Room = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const currentRoom = useAppSelector(selectCurrentRoom);

  // useEffect(() => {
  //   loadUsers();

  //   window.Echo.private(`rooms.${currentRoom?.id ?? 0}`)
  //     .listen('JoinRoom', (event: unknown) => {
  //       console.log(event);
  //     })
  //     .listen('LeaveRoom', (event: unknown) => {
  //       console.log(event);
  //     })
  //     .listen('DeleteRoom', (event: unknown) => {
  //       console.log(event);
  //     });
  // }, []);

  const isRoomOwner = (): boolean => user?.id === currentRoom?.user_id;

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
