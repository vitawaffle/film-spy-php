import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import type { ChangeEvent } from 'react';
import { CircularProgress, List, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import RoomListItem from './room-list-item';
import useLoadRooms from './use-load-rooms';
import { selectRooms, selectIsRoomsLoading } from 'app-slice';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';
import type { Room } from 'models';

const RoomList = (): ReactElement => {
  const isRoomsLoading = useAppSelector(selectIsRoomsLoading);
  const rooms = useAppSelector(selectRooms);
  const loadRooms = useLoadRooms();

  useEffect(() => {
    void loadRooms();
  }, []);

  const [searchName, setSearchName] = useState('');

  const handleSearchNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchName(event.currentTarget.value);
  };

  const filterBySearchName = (room: Room): RegExpMatchArray | null => room.name.match(searchName);
  const filteredRooms = rooms.filter(filterBySearchName);
  const isEmpty = filteredRooms.length === 0;

  return (
    <Stack spacing={2}>
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
        disabled={isRoomsLoading}
      />
      {isRoomsLoading ? (
        <CircularProgress />
      ) : (
        isEmpty ? (
          <Typography>
            {strings.features.rooms.roomList.noContent}
          </Typography>
        ) : (
          <List>
            {rooms.filter(filterBySearchName).map((room, i) => (
              <RoomListItem key={i} room={room} />
            ))}
          </List>
        )
      )}
    </Stack>
  );
};

export default RoomList;
