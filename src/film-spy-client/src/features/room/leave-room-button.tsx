import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, LinearProgress } from '@mui/material';
import client from 'client';
import { useCheckAuthentication } from 'hooks';
import { strings } from 'localization';
import { Dialog } from 'features/ui';

const LeaveRoomButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const handleOkClick = async () => {
    setIsLoading(true);

    try {
      await client.post('/api/rooms/leave');

      await checkAuthentication();

      navigate('/home');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        id="leave-room"
        title={strings.common.leaveRoom + '?'}
        onOk={handleOkClick}
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
