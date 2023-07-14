import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, LinearProgress } from '@mui/material';

import client from 'client';
import { strings } from 'localization';
import { useAppDispatch } from 'hooks';
import { Dialog } from 'features/ui';
import { roomLeft } from 'features/room';

const LeaveRoomButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOk = async () => {
    setIsLoading(true);

    try {
      await client.post('/api/rooms/leave');
      dispatch(roomLeft());
      navigate('/home');
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog
        isOpen={isModalOpen}
        id="leave-room"
        title={strings.common.leaveRoom + '?'}
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
      <Button variant="outlined" onClick={handleClick}>
        {strings.common.leave}
      </Button>
    </>
  );
};

export default LeaveRoomButton;
