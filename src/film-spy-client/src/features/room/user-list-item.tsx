import React, { useState } from 'react';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';

import KickUserButton from './kick-user-button';
import useIsRoomOwner from './use-is-room-owner';
import type { User } from 'models';

export type UserListItemProps = {
  user: User,
};

const UserListItem = ({ user }: UserListItemProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  const isRoomOwner = useIsRoomOwner();

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={user.name} />
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isRoomOwner && <KickUserButton user={user} />}
        </List>
      </Collapse>
    </>
  );
};

export default UserListItem;
