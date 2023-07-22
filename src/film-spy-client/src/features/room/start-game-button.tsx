import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';

import client from 'client';
import { selectUsers } from 'features/room';
import { Dialog } from 'features/ui';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

const StartGameButton = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post('/api/games/start');
      navigate('/game');
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = (): void => {
    setIsModalOpen(false);
  };

  const users = useAppSelector(selectUsers);

  const isDisabled = (users?.length ?? 0) < 3;

  return (
    <>
      <Dialog
        isOpen={isModalOpen}
        id="start-game"
        title={strings.features.rooms.startGameButton.startGame + '?'}
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
      <Button variant="contained" onClick={handleClick} disabled={isDisabled}>
        {strings.features.rooms.startGameButton.startGame}
      </Button>
    </>
  );
};

export default StartGameButton;
