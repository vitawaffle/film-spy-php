import React from 'react';
import { List } from '@mui/material';

import useCurrentGame from './use-current-game';
import UserListItem from './user-list-item';

const UserList = (): React.ReactElement => {
  const currentGame = useCurrentGame();
  const users = currentGame.users;

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {users.map((user, i) => <UserListItem key={i} user={user} />)}
    </List>
  );
};

export default UserList;
