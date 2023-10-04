import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { Dialog } from 'features/ui';
import { strings } from 'localization';

const LeaveRoomButton = (): React.ReactElement => {
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
      await client.post(`/api/rooms/${roomId}/leave`);
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
        id="leaveRoom"
        title={strings.features.room.leaveRoomButton.leaveRoom + '?'}
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
      <Button onClick={handleClick} variant="outlined" color="secondary">
        {strings.features.room.leaveRoomButton.leaveRoom}
      </Button>
    </>
  );
};

export default LeaveRoomButton;
