import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, LinearProgress } from '@mui/material';

import { selectIsGameStarted, roomLeft } from 'app-slice';
import client from 'client';
import { Dialog } from 'features/ui';
import { useAppDispatch, useAppSelector } from 'hooks';
import { strings } from 'localization';

const LeaveRoomButton = (): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post('/api/rooms/leave');
      dispatch(roomLeft());
      navigate('/home');
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = (): void => {
    setIsModalOpen(false);
  };

  const isGameStarted = useAppSelector(selectIsGameStarted);

  return (
    <>
      <Dialog
        isOpen={isModalOpen}
        id="leave-room"
        title={strings.common.leaveRoom + '?'}
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
      <Button
        variant="outlined"
        onClick={handleClick}
        disabled={isGameStarted}
      >
        {strings.common.leave}
      </Button>
    </>
  );
};

export default LeaveRoomButton;
