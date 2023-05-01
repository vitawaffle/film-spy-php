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
import { CreateRoomForm } from 'features/rooms';
import { modalStyle } from 'features/ui';

type CreateRoomModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
};

const CreateRoomModal = ({
  isOpen,
  setIsOpen,
}: CreateRoomModalProps) => {
  const handleClose = () => setIsOpen(false);

  const handleSuccess = () => setIsOpen(false);

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
      aria-labelledby="create-room-modal-title"
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography
              id="create-room-modal-title"
              variant="h4"
              component="h4"
            >
              {strings.features.rooms.createRoomModal.createRoom}
            </Typography>
            <CreateRoomForm onSuccess={handleSuccess} />
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateRoomModal;
