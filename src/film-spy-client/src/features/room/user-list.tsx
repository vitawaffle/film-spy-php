import React from 'react';
import { Box, CircularProgress, List } from '@mui/material';

import UserListItem from './user-list-item';
import { selectIsUsersLoading, selectUsers } from 'app-slice';
import { useAppSelector } from 'hooks';

const UserList = (): JSX.Element => {
  const isUsersLoading = useAppSelector(selectIsUsersLoading);
  const users = useAppSelector(selectUsers);

  return (
    isUsersLoading ? (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    ) : (
      <List>
        {users.map((user, i) => <UserListItem key={i} user={user} />)}
      </List>
    )
  );
};

export default UserList;
