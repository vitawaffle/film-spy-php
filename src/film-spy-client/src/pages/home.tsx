import React, { useState } from 'react';
import { Card, CardContent, Stack, Typography, Button } from '@mui/material';
import {
  Create as CreateIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAppSelector } from 'hooks';
import { selectIsAuthenticated } from 'app-slice';
import {
  RoomList,
  CreateRoomModal,
  JoinRoomModal,
  useLoadRooms,
} from 'features/rooms';
import { strings } from 'localization';

const Home = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const handleCreateRoomClick = () => setIsCreateRoomModalOpen(true);

  const loadRooms = useLoadRooms();

  const handleRefreshClick = async () => {
    await loadRooms();
  };

  return (
    <>
      {isAuthenticated && (
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <CreateRoomModal
                isOpen={isCreateRoomModalOpen}
                setIsOpen={setIsCreateRoomModalOpen}
              />
              <JoinRoomModal />
              <Typography variant="h3" component="h3">
                {strings.common.rooms}
              </Typography>
              <Stack spacing={2} direction="row">
                <Button
                  onClick={handleCreateRoomClick}
                  variant="contained"
                  startIcon={<CreateIcon />}
                >
                  {strings.common.create}
                </Button>
                <Button
                  onClick={handleRefreshClick}
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                >
                  {strings.common.refresh}
                </Button>
              </Stack>
              <RoomList />
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Home;
