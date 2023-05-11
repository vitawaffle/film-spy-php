import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@mui/icons-material';
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
import { selectUser } from 'app-slice';

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
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const isCurrentRoom = (roomId: number) => user?.room?.id === roomId;

  const handleJoinRoomClick = (roomId: number) => () => {
    if (isCurrentRoom(roomId)) {
      navigate('/room');

      return;
    }

    dispatch(setSelectedRoomId(roomId));
    dispatch(setIsJoinRoomModalOpen(true));
  };

  const text = ({ id, name }: Room) =>
    name + (isCurrentRoom(id)? ` (${strings.common.current})` : '');

  return (
    isLoading ? (
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
            {rooms.filter(filterBySearchName).map(({ id, name, user_id }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={handleJoinRoomClick(id)}>
                  {isCurrentRoom(id) && (
                    <ListItemIcon>
                      <ArrowForwardIosIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText>
                    {text({ id, name, user_id })}
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
