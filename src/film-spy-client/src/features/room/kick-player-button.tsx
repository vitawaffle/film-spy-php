import React, { useState } from 'react';
import { Box, IconButton, LinearProgress } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

import client from 'client';
import { selectCurrentRoom } from 'features/room';
import { Dialog } from 'features/ui';
import { useAppSelector } from 'hooks';
import type { User } from 'models';
import { strings } from 'localization';

export type KickPlayerButtonProps = {
  user: User,
};

const KickPlayerButton = ({ user }: KickPlayerButtonProps): JSX.Element => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isKicking, setIsKicking] = useState(false);
  const currentRoom = useAppSelector(selectCurrentRoom);

  const handleButtonClick = (): void => {
    setIsConfirmDialogOpen(true);
  };

  const handleOk = async (): Promise<void> => {
    setIsKicking(true);

    try {
      await client.post(`/api/rooms/${currentRoom?.id ?? 0}/kick`, { user_id: user.id });
    } finally {
      setIsKicking(false);
    }
  };

  const closeConfirmDialog = (): void => {
    setIsConfirmDialogOpen(false);
  };

  return (
    <>
      <Dialog
        isOpen={isConfirmDialogOpen}
        id={'kick-player-' + user.id}
        title={strings.features.rooms.kickPlayerButton.kickPlayer}
        onOk={handleOk}
        onCancel={closeConfirmDialog}
        onClose={closeConfirmDialog}
        isOkDisabled={isKicking}
      >
        {isKicking && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <Box mt={2}>
          {`${strings.features.rooms.kickPlayerButton.kickPlayerQuestion} ${user.name ?? user.email}?`}
        </Box>
      </Dialog>
      <IconButton
        onClick={handleButtonClick}
        edge="end"
        aria-label={strings.features.rooms.kickPlayerButton.kickPlayer}
      >
        <BlockIcon />
      </IconButton>
    </>
  );
};

export default KickPlayerButton;