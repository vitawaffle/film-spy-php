import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

import type { User } from 'models';

export type UserListItemProps = {
  user: User,
};

const UserListItem = ({ user }: UserListItemProps): React.ReactElement => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItem;
