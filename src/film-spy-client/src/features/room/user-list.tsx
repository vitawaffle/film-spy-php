import React from 'react';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useAppSelector } from 'hooks';
import { selectIsUsersLoading, selectUsers } from 'features/room';

const UserList = () => {
  const isUsersLoading = useAppSelector(selectIsUsersLoading);
  const users = useAppSelector(selectUsers);

  return (
    isUsersLoading ? (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    ) : (
      <List>
        {users.map(user => (
          <ListItem key={user.id} disablePadding>
            <ListItemText>
              {user.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    )
  );
};

export default UserList;
