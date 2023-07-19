import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import {
  Box,
  CircularProgress,
  List,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import RoomListItem from './room-list-item';
import { selectRooms, selectIsRoomsLoading, useLoadRooms } from 'features/room';
import { useAppSelector } from 'hooks';
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
            {rooms.filter(filterBySearchName).map((room, i) => (
              <RoomListItem key={i} room={room} />
            ))}
          </List>
        </Stack>
      )
    )
  );
};

export default RoomList;
