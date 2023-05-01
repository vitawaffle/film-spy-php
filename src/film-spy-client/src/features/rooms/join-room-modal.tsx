import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { strings } from 'localization';
import { JoinRoomForm } from 'features/rooms';
import { modalStyle } from 'features/ui';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  selectIsJoinRoomModalOpen,
  setIsJoinRoomModalOpen,
} from 'features/rooms';

const JoinRoomModal = () => {
  const isOpen = useAppSelector(selectIsJoinRoomModalOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsJoinRoomModalOpen(false));
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="join-room-modal-title"
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography
              id="join-room-modal-title"
              variant="h4"
              component="h4"
            >
              {strings.features.rooms.joinRoomModal.joinRoom}
            </Typography>
            <JoinRoomForm />
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JoinRoomModal;
