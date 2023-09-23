import React from 'react';
import { ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { strings } from 'localization';
import type { Room } from 'models';

export type RoomListItemProps = {
  room: Room;
};

const RoomListItem = ({ room }: RoomListItemProps): React.ReactElement => {
  return (
    <ListItem>
      <ListItemButton>
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
              {' ' + room.owner.name}
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
