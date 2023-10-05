import React, { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';

import CreateRoomModal from './create-room-modal';
import { strings } from 'localization';

const CreateRoomButton = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick} variant="contained" startIcon={<CreateIcon />}>
        {strings.common.create}
      </Button>
      <CreateRoomModal isOpen={isModalOpen} onSuccess={closeModal} onClose={closeModal} />
    </>
  );
};

export default CreateRoomButton;
