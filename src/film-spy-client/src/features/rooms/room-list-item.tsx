import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { roomSelected, selectJoinedRooms } from './rooms-slice';
import { strings } from 'localization';
import type { Room } from 'models';
import { useDispatch, useSelector } from 'store';

export type RoomListItemProps = {
  room: Room;
};

const RoomListItem = ({ room }: RoomListItemProps): React.ReactElement => {
  const joinedRooms = useSelector(selectJoinedRooms);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isJoined = joinedRooms.find(item => item.id === room.id) !== undefined;

  const handleClick = (): void => {
    if (isJoined) {
      navigate('/rooms/' + room.id);
      return;
    }

    dispatch(roomSelected(room));
  };

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton onClick={handleClick} selected={isJoined}>
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
              {' ' + room.owner.name + ', '}
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {strings.features.rooms.roomListItem.players}:
              </Typography>
              {' ' + room.usersCount}
              {isJoined && `, ${strings.common.joined}`}
            </>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default RoomListItem;
