import React from 'react';
import type { ReactElement } from 'react';

import CreateRoomForm from './create-room-form';
import { Modal } from 'features/ui';
import { strings } from 'localization';

type CreateRoomModalProps = {
  isOpen: boolean,
  onSuccess?: () => void,
  onClose?: () => void,
};

const CreateRoomModal = ({ isOpen, onSuccess, onClose}: CreateRoomModalProps): ReactElement => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    id="create-room"
    title={strings.features.rooms.createRoomModal.createRoom}
  >
    <CreateRoomForm onSuccess={onSuccess} />
  </Modal>
);

export default CreateRoomModal;
