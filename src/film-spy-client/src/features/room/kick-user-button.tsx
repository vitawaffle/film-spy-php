import React, { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, LinearProgress, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { Dialog } from 'features/ui';
import { strings } from 'localization';
import type { User } from 'models';

export type KickUserButtonProps = {
  user: User,
};

const KickUserButton = ({ user }: KickUserButtonProps): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsDialogOpen(true);
  };

  const roomId = useCurrentRoomId();

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post(`/api/rooms/${roomId}/kick`, {
        user_id: user.id,
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
        id={`kickUser${user.id}`}
        title={strings.features.room.kickUserButton.kickUser + '?'}
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
      <ListItemButton onClick={handleClick} sx={{ pl: 4 }}>
        <ListItemIcon>
          <RemoveCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary={strings.features.room.kickUserButton.kickUser} />
      </ListItemButton>
    </>
  );
};

export default KickUserButton;
