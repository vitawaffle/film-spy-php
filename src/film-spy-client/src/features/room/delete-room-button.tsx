import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';

import { selectRoom } from 'app-slice';
import client from 'client';
import { Dialog } from 'features/ui';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const DeleteRoomButton = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const room = useAppSelector(selectRoom);
  const navigate = useNavigate();

  const handleOk = async (): Promise<void> => {
    if (room) {
      setIsLoading(true);

      try {
        await client.post('/api/rooms/delete', { room_id: room.id });

        navigate('/home');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeDialog = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog
        isOpen={isModalOpen}
        id="delete-room"
        title={strings.common.deleteRoom + '?'}
        onOk={handleOk}
        onCancel={closeDialog}
        onClose={closeDialog}
        isOkDisabled={isLoading}
      >
        {isLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
      </Dialog>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClick}
      >
        {strings.common.deleteRoom}
      </Button>
    </>
  );
};

export default DeleteRoomButton;
