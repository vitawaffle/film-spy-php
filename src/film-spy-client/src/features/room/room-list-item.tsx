import React from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { selectRoom, selectIsGameStarted, roomSelected } from 'app-slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { strings } from 'localization';
import type { Room } from 'models';

export type RoomListItemProps = {
  room: Room,
};

const RoomListItem = ({ room }: RoomListItemProps): ReactElement => {
  const currentRoom = useAppSelector(selectRoom);

  const isCurrentRoom = !!currentRoom && (currentRoom.id === room.id);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleJoinRoomClick = (): void => {
    if (isCurrentRoom) {
      navigate('/room');
      return;
    }

    dispatch(roomSelected(room));
  };

  const isGameStarted = useAppSelector(selectIsGameStarted);
  const isDisabled = isGameStarted && !isCurrentRoom;

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton
        onClick={handleJoinRoomClick}
        selected={isCurrentRoom}
        disabled={isDisabled}
      >
        <ListItemText
          primary={room.name}
          secondary={(
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {strings.features.rooms.roomListItem.owner}:
              </Typography>
              {` ${room.user.name ?? room.user}, `}
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {strings.features.rooms.roomListItem.players}:
              </Typography>
              {' ' + room.users_count}
            </>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default RoomListItem;
