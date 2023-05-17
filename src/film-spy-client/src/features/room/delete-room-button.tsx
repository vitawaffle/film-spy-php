import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';
import { Dialog } from 'features/ui';
import { strings } from 'localization';
import client from 'client';
import { useCheckAuthentication, useAppSelector } from 'hooks';
import { selectUser } from 'app-slice';

const DeleteRoomButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const user = useAppSelector(selectUser);
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const handleOkClick = async () => {
    setIsLoading(true);

    try {
      await client.post('/api/rooms/delete', {
        room_id: user?.room?.id ?? 0,
      });

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
        id="delete-room"
        title={strings.common.deleteRoom + '?'}
        onOk={handleOkClick}
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
