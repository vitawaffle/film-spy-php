import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
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

import {
  selectRooms,
  selectIsRoomsLoading,
  selectCurrentRoom,
  useLoadRooms,
  roomSelected,
} from 'features/room';
import { useAppSelector, useAppDispatch } from 'hooks';
import type { Room } from 'models';
import { strings } from 'localization';

const RoomList = (): JSX.Element => {
  const isRoomsLoading = useAppSelector(selectIsRoomsLoading);
  const rooms = useAppSelector(selectRooms);
  const loadRooms = useLoadRooms();

  useEffect(() => {
    loadRooms();
  }, []);

  const [searchName, setSearchName] = useState('');

  const handleSearchNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchName(event.currentTarget.value);
  };

  const filterBySearchName = (room: Room): RegExpMatchArray | null => room.name.match(searchName);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentRoom = useAppSelector(selectCurrentRoom);

  const isCurrentRoom = (room: Room): boolean => currentRoom?.id === room.id;

  const handleJoinRoomClick = (room: Room): () => void => {
    return (): void => {
      if (isCurrentRoom(room)) {
        navigate('/room');
        return;
      }

      dispatch(roomSelected(room));
    };
  };

  const text = (room: Room): string => room.name
    + (isCurrentRoom(room) ? ` (${strings.common.current})` : '');

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
              ),
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
