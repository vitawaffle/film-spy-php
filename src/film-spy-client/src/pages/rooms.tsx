import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Create as CreateIcon, Refresh as RefreshIcon } from '@mui/icons-material';

import { selectIsRoomsLoading } from 'app-slice';
import { CreateRoomModal, JoinRoomModal, useLoadRooms, RoomList } from 'features/room';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const Rooms = (): ReactElement => {
  const isRoomsLoading = useAppSelector(selectIsRoomsLoading);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const closeCreateRoomModal = (): void => {
    setIsCreateRoomModalOpen(false);
  };

  const handleCreateRoomClick = (): void => {
    setIsCreateRoomModalOpen(true);
  };

  const loadRooms = useLoadRooms();

  const handleRefreshClick = async (): Promise<void> => {
    await loadRooms();
  };
  
  return (
    <>
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onSuccess={closeCreateRoomModal}
        onClose={closeCreateRoomModal}
      />
      <JoinRoomModal />
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h3" component="h3">
              {strings.common.rooms}
            </Typography>
            <Stack spacing={2} direction="row">
              <Button onClick={handleCreateRoomClick} variant="contained" startIcon={<CreateIcon />}>
                {strings.common.create}
              </Button>
              <Button
                onClick={handleRefreshClick}
                variant="outlined"
                startIcon={<RefreshIcon />}
                disabled={isRoomsLoading}
              >
                {strings.common.refresh}
              </Button>
            </Stack>
            <RoomList />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default Rooms;
