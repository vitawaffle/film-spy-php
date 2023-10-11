import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';

import ChangeRoomPasswordModal from './change-room-password-modal';
import { strings } from 'localization';

const ChangeRoomPasswordButton = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const handleSuccess = (): void => {
    closeModal();
    enqueueSnackbar(strings.features.room.changeRoomPasswordButton.passwordChanged);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick} variant="outlined">
        {strings.features.room.changeRoomPasswordButton.changeRoomPassword}
      </Button>
      <ChangeRoomPasswordModal isOpen={isModalOpen} onSuccess={handleSuccess} onClose={closeModal} />
    </>
  );
};

export default ChangeRoomPasswordButton;
