import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { roomSelected, selectCurrentRoom } from 'features/room';
import { useAppDispatch, useAppSelector } from 'hooks';
import type { Room } from 'models';
import { strings } from 'localization';

export type RoomListItemProps = {
  room: Room,
};

const RoomListItem = ({ room }: RoomListItemProps): JSX.Element => {
  const currentRoom = useAppSelector(selectCurrentRoom);

  const isCurrentRoom = (room: Room): boolean => currentRoom?.id === room.id;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleJoinRoomClick = (room: Room): () => void => {
    return (): void => {
      if (isCurrentRoom(room)) {
        navigate('/room');
        return;
      }

      dispatch(roomSelected(room));
    };
  };

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton onClick={handleJoinRoomClick(room)} selected={isCurrentRoom(room)}>
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
