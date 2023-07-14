import React from 'react';

import { strings } from 'localization';
import {
  selectIsJoinRoomModalOpen,
  roomUnselected,
  JoinRoomForm,
} from 'features/room';
import { useAppSelector, useAppDispatch } from 'hooks';
import { Modal } from 'features/ui';

const JoinRoomModal = () => {
  const isOpen = useAppSelector(selectIsJoinRoomModalOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(roomUnselected());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      id="join-room"
      title={strings.features.rooms.joinRoomModal.joinRoom}
    >
      <JoinRoomForm />
    </Modal>
  );
};

export default JoinRoomModal;
