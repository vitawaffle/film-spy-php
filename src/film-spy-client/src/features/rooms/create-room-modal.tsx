import React from 'react';

import { Modal } from 'features/ui';
import { strings } from 'localization';

export type CreateRoomModalProps = {
  isOpen: boolean,
  onSuccess?: () => Promise<void> | void,
  onClose?: () => Promise<void> | void,
};

const CreateRoomModal = ({ isOpen, onSuccess, onClose }: CreateRoomModalProps): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} id="createRoom" title={strings.features.rooms.createRoomModal.title}>
    </Modal>
  );
};

export default CreateRoomModal;
