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

const Room = () => {
  const loadUsers = useLoadUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  const user = useAppSelector(selectUser);

  const isRoomOwner = () => {
    return user !== undefined
      && user?.room !== undefined
      && user?.id === user?.room?.user_id;
  };

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
