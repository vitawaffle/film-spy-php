import React from 'react';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { selectIsUsersLoading, selectUsers } from 'features/room';
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
        {users.map((user, i) => (
          <ListItem key={user.id} disablePadding>
            <ListItemText>
              {i + 1}. {user.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    )
  );
};

export default UserList;