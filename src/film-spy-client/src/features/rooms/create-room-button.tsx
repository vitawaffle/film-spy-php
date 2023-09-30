import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

import CreateRoomModal from './create-room-modal';
import { selectIsEmailVerified } from 'features/auth';
import { strings } from 'localization';
import { useSelector } from 'store';

const CreateRoomButton = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const isEmailVerified = useSelector(selectIsEmailVerified);

  return (
    <>
      <Button onClick={handleClick} variant="contained" startIcon={<CreateIcon />} disabled={!isEmailVerified}>
        {strings.common.create}
      </Button>
      <CreateRoomModal isOpen={isModalOpen} onSuccess={closeModal} onClose={closeModal} />
    </>
  );
};

export default CreateRoomButton;
