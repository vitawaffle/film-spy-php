import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, CardContent, Divider, Grid, Stack, Typography} from '@mui/material';

import { useIsHasRoom, useIsRoomOwner } from 'features/room';
import { DeleteRoomButton, LeaveRoomButton, RoomChannelListener, UserList } from 'features/room';
import { Centered } from 'features/ui';
import { strings } from 'localization';

const Room = (): React.ReactElement => {
  const isHasRoom = useIsHasRoom();
  const isRoomOwner = useIsRoomOwner();

  return isHasRoom ? (
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
  ) : (
    <Centered>
      <Card>
        <CardContent>
          <Stack>
            <Typography variant="h4" component="h4" align="center" mb={4}>
              {strings.pages.room.notJoined}
            </Typography>
            <Button component={Link} to="/rooms" variant="contained">
              {strings.common.rooms}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Centered>
  );
};

export default Room;
