import React, { useEffect } from 'react';
import { Box, CircularProgress, List, Typography } from '@mui/material';

import RoomListItem from './room-list-item';
import { selectIsRoomsLoading, selectRooms } from './rooms-slice';
import useLoadRooms from './use-load-rooms';
import { strings } from 'localization';
import { useSelector } from 'store';

const RoomList = (): React.ReactElement => {
  const loadRooms = useLoadRooms();

  useEffect(() => {
    void loadRooms();
  }, []);

  const isRoomsLoading = useSelector(selectIsRoomsLoading);
  const rooms = useSelector(selectRooms);
  const isEmpty = rooms.length === 0;

  return isRoomsLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (isEmpty ? (
    <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
      {strings.features.rooms.roomList.empty}
    </Typography>
  ) : (
    <List>
      {rooms.map((room, i) => <RoomListItem room={room} key={i} />)}
    </List>
  ));
};

export default RoomList;
