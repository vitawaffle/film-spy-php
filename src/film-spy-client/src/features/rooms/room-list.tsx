import React from 'react';
import { Box, CircularProgress, List, Typography } from '@mui/material';

import JoinRoomModal from './join-room-modal';
import RoomListItem from './room-list-item';
import { selectIsJoinedRoomsLoading, selectIsRoomsLoading, selectRooms } from './rooms-slice';
import { strings } from 'localization';
import { useSelector } from 'store';

const RoomList = (): React.ReactElement => {
  const isRoomsLoading = useSelector(selectIsRoomsLoading);
  const isJoinedRoomsLoading = useSelector(selectIsJoinedRoomsLoading);
  const rooms = useSelector(selectRooms);
  const isEmpty = rooms.length === 0;

  return (isRoomsLoading || isJoinedRoomsLoading) ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (isEmpty ? (
    <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
      {strings.features.rooms.roomList.empty}
    </Typography>
  ) : (
    <>
      <JoinRoomModal />
      <List>
        {rooms.map((room, i) => <RoomListItem room={room} key={i} />)}
      </List>
    </>
  ));
};

export default RoomList;
