import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { Dialog } from 'features/ui';
import { strings } from 'localization';

const StartGameButton = (): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsDialogOpen(true);
  };

  const currentRoomId = useCurrentRoomId();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post('/api/games/start', {
        room_id: currentRoomId,
      });

      setIsDialogOpen(false);
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
        id="startGame"
        title={strings.features.room.startGameButton.startGame + '?'}
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
      <Button onClick={handleClick} variant="contained" color="primary">
        {strings.features.room.startGameButton.startGame}
      </Button>
    </>
  );
};

export default StartGameButton;
