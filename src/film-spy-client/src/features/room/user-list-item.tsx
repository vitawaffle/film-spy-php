import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

import KickPlayerButton from './kick-player-button';
import type { User } from 'models';

export type UserListItemProps = {
  user: User,
};

const UserListItem = ({ user }: UserListItemProps): JSX.Element => (
  <ListItem disablePadding secondaryAction={<KickPlayerButton user={user} />}>
    <ListItemText>
      {user.name ?? user.email}
    </ListItemText>
  </ListItem>
);

export default UserListItem;
