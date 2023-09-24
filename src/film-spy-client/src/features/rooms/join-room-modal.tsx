import React from 'react';

import { roomUnselected, selectSelectedRoom } from './rooms-slice';
import { Modal } from 'features/ui';
import { strings } from 'localization';
import { useDispatch, useSelector } from 'store';

const JoinRoomModal = (): React.ReactElement => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(selectSelectedRoom);
  const isOpen = selectedRoom !== undefined;

  const handleClose = (): void => {
    dispatch(roomUnselected());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} id="joinRoom" title={strings.features.rooms.joinRoomModal.title}>
    </Modal>
  );
};

export default JoinRoomModal;
