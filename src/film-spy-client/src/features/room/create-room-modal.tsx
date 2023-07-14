import React from 'react';

import { strings } from 'localization';
import { CreateRoomForm } from 'features/room';
import { Modal } from 'features/ui';

type CreateRoomModalProps = {
  isOpen: boolean,
  onSuccess?: () => void,
  onClose?: () => void,
};

const CreateRoomModal = ({
  isOpen,
  onSuccess,
  onClose,
}: CreateRoomModalProps) => {
  const handleSuccess = () => {
    if (onSuccess)
      onSuccess();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      id="create-room"
      title={strings.features.rooms.createRoomModal.createRoom}
    >
      <CreateRoomForm onSuccess={handleSuccess} />
    </Modal>
  );
};

export default CreateRoomModal;
