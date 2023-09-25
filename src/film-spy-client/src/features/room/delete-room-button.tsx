import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';

import client from 'client';
import { Dialog } from 'features/ui';
import { strings } from 'localization';

const DeleteRoomButton = (): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsDialogOpen(true);
  };

  const { id } = useParams();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post('/api/rooms/delete', { room_id: parseInt(id ?? '') });
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
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
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
