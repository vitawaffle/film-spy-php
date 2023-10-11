import React from 'react';

import ChangeRoomPasswordForm from './change-room-password-form';
import { Modal } from 'features/ui';
import { strings } from 'localization';

export type ChangeRoomPasswordModalProps = {
  isOpen: boolean,
  onSuccess?: () => Promise<void> | void,
  onClose?: () => Promise<void> | void,
};

const ChangeRoomPasswordModal = ({ isOpen, onSuccess, onClose }: ChangeRoomPasswordModalProps): React.ReactElement => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    id="changeRoomPassword"
    title={strings.features.room.changeRoomPasswordModal.title}
  >
    <ChangeRoomPasswordForm onSuccess={onSuccess} />
  </Modal>
);

export default ChangeRoomPasswordModal;
