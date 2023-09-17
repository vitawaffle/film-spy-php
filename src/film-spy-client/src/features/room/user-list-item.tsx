import React from 'react';
import type { ReactElement } from 'react';
import { Chip, ListItem, ListItemText } from '@mui/material';

import KickPlayerButton from './kick-player-button';
import { selectRoom, selectUser, selectIsGameStarted, selectPlayers } from 'app-slice';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';
import type { User } from 'models';

export type UserListItemProps = {
  user: User,
};

const UserListItem = ({ user }: UserListItemProps): ReactElement => {
  const currentUser = useAppSelector(selectUser);
  const room = useAppSelector(selectRoom);

  const isOwner = currentUser && room && room.user.id === currentUser.id;
  const isGameStarted = useAppSelector(selectIsGameStarted);

  const secondaryAction: ReactElement | undefined = isOwner && !isGameStarted
    ? <KickPlayerButton user={user} />
    : undefined;

  const players = useAppSelector(selectPlayers);
  const isInGame = !!players.find(player => player.id === user.id);

  return (
    <ListItem disablePadding secondaryAction={secondaryAction}>
      <ListItemText>
        {(user.name ?? user.email) + ' '}
        {isInGame && <Chip label={strings.features.rooms.userList.inGame} />}
      </ListItemText>
    </ListItem>
  );
};

export default UserListItem;
