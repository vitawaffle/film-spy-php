import React from 'react';
import { useAppSelector } from 'hooks';
import { selectIsAuthenticated } from 'app-slice';
import { RoomList } from 'features/rooms';

const Home = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <RoomList />
      )}
    </>
  );
};

export default Home;
