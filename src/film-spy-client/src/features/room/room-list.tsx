import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { strings } from 'localization';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  selectRooms,
  selectIsRoomsLoading,
  selectCurrentRoom,
  useLoadRooms,
  roomSelected,
} from 'features/room';
import { Room } from 'models';

const RoomList = () => {
  const isRoomsLoading = useAppSelector(selectIsRoomsLoading);
  const rooms = useAppSelector(selectRooms);
  const loadRooms = useLoadRooms();

  useEffect(() => {
    loadRooms();
  }, []);

  const [searchName, setSearchName] = useState('');

  const handleSearchNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.currentTarget.value);
  };

  const filterBySearchName = (room: Room) => room.name.match(searchName);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const isCurrentRoom = (room: Room) => currentRoom?.id === room.id;

  const handleJoinRoomClick = (room: Room) => () => {
    if (isCurrentRoom(room)) {
      navigate('/room');
      return;
    }

    dispatch(roomSelected(room));
  };

  const text = (room: Room) =>
    room.name + (isCurrentRoom(room) ? ` (${strings.common.current})` : '');

  return (
    isRoomsLoading ? (
      <Box sx={{ dispay: 'flex' }}>
        <CircularProgress />
      </Box>
    ) : (
      rooms.length === 0 ? (
        <Typography>
          {strings.features.rooms.roomList.noContent}
        </Typography>
      ) : (
        <Stack>
          <TextField
            id="searchName"
            label={strings.features.rooms.roomList.searchName}
            value={searchName}
            onChange={handleSearchNameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <List>
            {rooms.filter(filterBySearchName).map(room => (
              <ListItem key={room.id} disablePadding>
                <ListItemButton onClick={handleJoinRoomClick(room)}>
                  <ListItemText>
                    {text(room)}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      )
    )
  );
};

export default RoomList;
