import React from 'react';
import { strings } from 'localization';
import { JoinRoomForm } from 'features/rooms';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  selectIsJoinRoomModalOpen,
  setIsJoinRoomModalOpen,
} from 'features/rooms';
import { Modal } from 'features/ui';

const JoinRoomModal = () => {
  const isOpen = useAppSelector(selectIsJoinRoomModalOpen);
  const dispatch = useAppDispatch();

  const setIsOpen = (isOpen: boolean) => {
    dispatch(setIsJoinRoomModalOpen(isOpen));
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      id="join-room"
      title={strings.features.rooms.joinRoomModal.joinRoom}
    >
      <JoinRoomForm />
    </Modal>
  );
};

export default JoinRoomModal;
