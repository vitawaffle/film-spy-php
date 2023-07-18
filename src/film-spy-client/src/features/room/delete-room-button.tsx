import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';

import client from 'client';
import { selectCurrentRoom } from 'features/room';
import { Dialog } from 'features/ui';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const DeleteRoomButton = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const currentRoom = useAppSelector(selectCurrentRoom);
  const navigate = useNavigate();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post('/api/rooms/delete', {
        room_id: currentRoom?.id ?? 0,
      });

      navigate('/home');
    } finally {
      setIsLoading(false);
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
