import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import useCurrentRoomId from './use-current-room-id';
import client from 'client';
import { ConfirmableActionButton } from 'features/ui';
import { strings } from 'localization';
import type { User } from 'models';

export type KickUserButtonProps = {
  user: User,
};

const KickUserButton = ({ user }: KickUserButtonProps): React.ReactElement => {
  const roomId = useCurrentRoomId();

  const kickUser = async (): Promise<void> => {
    await client.post(`/api/rooms/${roomId}/kick`, { user_id: user.id });
  };

  return (
    <ConfirmableActionButton
      id={`kickUser${user.id}`}
      title={strings.features.room.kickUserButton.kickUser}
      component="list-item"
      icon={<RemoveCircleOutlineIcon />}
      color="error"
      action={kickUser}
    >
      {strings.features.room.kickUserButton.kickUser}
    </ConfirmableActionButton>
  );
};

export default KickUserButton;
