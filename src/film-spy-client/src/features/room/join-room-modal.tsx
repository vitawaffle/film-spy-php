import React from 'react';
import type { ReactElement } from 'react';

import JoinRoomForm from './join-room-form';
import { selectIsJoinRoomModalOpen, roomUnselected } from 'app-slice';
import { Modal } from 'features/ui';
import { useAppSelector, useAppDispatch } from 'hooks';
import { strings } from 'localization';

const JoinRoomModal = (): ReactElement => {
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
