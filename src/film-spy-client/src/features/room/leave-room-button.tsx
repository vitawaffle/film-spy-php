import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { roomLeft } from 'features/rooms';
import { Dialog } from 'features/ui';
import { strings } from 'localization';
import { useDispatch }  from 'store';

const LeaveRoomButton = (): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsDialogOpen(true);
  };

  const roomId = useCurrentRoomId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post(`/api/rooms/${roomId}/leave`);
      navigate('/rooms');
      dispatch(roomLeft(roomId));
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
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
