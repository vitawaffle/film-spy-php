import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

import KickPlayerButton from './kick-player-button';
import { selectRoom, selectUser } from 'app-slice';
import { useAppSelector } from 'hooks';
import type { User } from 'models';

export type UserListItemProps = {
  user: User,
};

const UserListItem = ({ user }: UserListItemProps): JSX.Element => {
  const currentUser = useAppSelector(selectUser);
  const room = useAppSelector(selectRoom);

  const isOwner = currentUser && room && room.user.id === currentUser.id;

  const secondaryAction: JSX.Element | undefined = isOwner ? <KickPlayerButton user={user} /> : undefined;

  return (
    <ListItem disablePadding secondaryAction={secondaryAction}>
      <ListItemText>
        {user.name ?? user.email}
      </ListItemText>
    </ListItem>
  );
};

export default UserListItem;
