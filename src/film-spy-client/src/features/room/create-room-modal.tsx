import React from 'react';

import { CreateRoomForm } from 'features/room';
import { Modal } from 'features/ui';
import { strings } from 'localization';

type CreateRoomModalProps = {
  isOpen: boolean,
  onSuccess?: () => void,
  onClose?: () => void,
};

const CreateRoomModal = ({ isOpen, onSuccess, onClose}: CreateRoomModalProps): JSX.Element => {
  const handleSuccess = (): void => {
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
