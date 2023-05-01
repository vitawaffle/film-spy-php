import React, { useState, useEffect, ChangeEvent } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import { strings } from 'localization';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  selectRooms,
  selectIsLoading,
  useLoadRooms,
  setSelectedRoomId,
  setIsJoinRoomModalOpen,
} from 'features/rooms';
import { Room } from 'models';

const RoomList = () => {
  const isLoading = useAppSelector(selectIsLoading);
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

  const handleJoinRoomClick = (roomId: number) => () => {
    dispatch(setSelectedRoomId(roomId));
    dispatch(setIsJoinRoomModalOpen(true));
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ dispay: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        rooms.length > 0 ? (
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
              {rooms.filter(filterBySearchName).map(({ id, name }) => (
                <ListItem key={id} disablePadding>
                  <ListItemButton onClick={handleJoinRoomClick(id)}>
                    <ListItemText>
                      {name}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        ) : (
          <Typography>
            {strings.pages.rooms.noContent}
          </Typography>
        )
      )}
    </>
  );
};

export default RoomList;
