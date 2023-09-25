import React, { useEffect } from 'react';
import { Box, CircularProgress, List } from '@mui/material';

import UserListItem from './user-list-item';
import { selectIsUsersLoading, selectUsers } from './room-slice';
import useLoadUsers from './use-load-users';
import { useSelector } from 'store';

const UserList = (): React.ReactElement => {
  const loadUsers = useLoadUsers();

  useEffect(() => {
    void loadUsers();
  }, []);

  const isUsersLoading = useSelector(selectIsUsersLoading);
  const users = useSelector(selectUsers);

  return isUsersLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <List component="nav">
      {users.map((user, i) => <UserListItem user={user} key={i} />)}
    </List>
  );
};

export default UserList;
