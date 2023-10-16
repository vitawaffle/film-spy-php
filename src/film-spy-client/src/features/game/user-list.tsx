import React from 'react';
import { Box, CircularProgress, List } from '@mui/material';

import { selectIsGameLoading, selectUsers } from './game-slice';
import UserListItem from './user-list-item';
import { useSelector } from 'store';

const UserList = (): React.ReactElement => {
  const isGameLoading = useSelector(selectIsGameLoading);
  const users = useSelector(selectUsers);

  return isGameLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {users.map((user, i) => <UserListItem key={i} user={user} />)}
    </List>
  );
};

export default UserList;
