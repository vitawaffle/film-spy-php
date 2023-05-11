import React, { useEffect } from 'react';
import { useLoadUsers, UserList } from 'features/room';

const Room = () => {
  const loadUsers = useLoadUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UserList />
  );
};

export default Room;
