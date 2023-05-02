import React from 'react';
import { strings } from 'localization';
import { CreateRoomForm } from 'features/rooms';
import { Modal } from 'features/ui';

type CreateRoomModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
};

const CreateRoomModal = ({
  isOpen,
  setIsOpen,
}: CreateRoomModalProps) => {
  const handleSuccess = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      id="create-room"
      title={strings.features.rooms.createRoomModal.createRoom}
    >
      <CreateRoomForm onSuccess={handleSuccess} />
    </Modal>
  );
};

export default CreateRoomModal;
