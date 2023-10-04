import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { Dialog } from 'features/ui';
import { strings } from 'localization';

const DeleteRoomButton = (): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsDialogOpen(true);
  };

  const roomId = useCurrentRoomId();
  const navigate = useNavigate();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.delete(`/api/rooms/${roomId}`);
      navigate('/rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = (): void => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        id="deleteRoom"
        title={strings.features.room.deleteRoomButton.deleteRoom + '?'}
        onOk={handleOk}
        onCancel={closeDialog}
        onClose={closeDialog}
        isControlDisabled={isLoading}
      >
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Dialog>
      <Button onClick={handleClick} variant="outlined" color="error">
        {strings.features.room.deleteRoomButton.deleteRoom}
      </Button>
    </>
  );
};

export default DeleteRoomButton;
