import React from 'react';

import {
  selectIsJoinRoomModalOpen,
  roomUnselected,
  JoinRoomForm,
} from 'features/room';
import { Modal } from 'features/ui';
import { useAppSelector, useAppDispatch } from 'hooks';
import { strings } from 'localization';

const JoinRoomModal = (): JSX.Element => {
  const isOpen = useAppSelector(selectIsJoinRoomModalOpen);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
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
