import React, { useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useAppSelector } from 'hooks';
import { selectIsAuthenticated } from 'app-slice';
import { RoomList, CreateRoomModal, JoinRoomModal } from 'features/rooms';
import { strings } from 'localization';

const Home = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const handleCreateRoomClick = () => setIsCreateRoomModalOpen(true);

  return (
    <>
      {isAuthenticated && (
        <Stack spacing={2}>
          <CreateRoomModal
            isOpen={isCreateRoomModalOpen}
            setIsOpen={setIsCreateRoomModalOpen}
          />
          <JoinRoomModal />
          <Typography variant="h3" component="h3">
            {strings.common.rooms}
          </Typography>
          <Button onClick={handleCreateRoomClick} variant="contained">
            {strings.common.create}
          </Button>
          <RoomList />
        </Stack>
      )}
    </>
  );
};

export default Home;
