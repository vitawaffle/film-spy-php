import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress } from '@mui/material';

import { selectUsers, selectIsGameStarted } from 'app-slice';
import client from 'client';
import { Dialog } from 'features/ui';
import { useAppSelector } from 'hooks';
import { strings } from 'localization';

export const MIN_PLAYERS = 1;

const StartGameButton = (): ReactElement => {
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
  const isGameStarted = useAppSelector(selectIsGameStarted);
  const isDisabled = (users?.length ?? 0) < MIN_PLAYERS || isGameStarted;

  return (
    <>
      <Dialog
        isOpen={isModalOpen}
        id="start-game"
        title={strings.features.rooms.startGameButton.startGame + '?'}
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
      <Button variant="contained" onClick={handleClick} disabled={isDisabled}>
        {strings.features.rooms.startGameButton.startGame}
      </Button>
    </>
  );
};

export default StartGameButton;
