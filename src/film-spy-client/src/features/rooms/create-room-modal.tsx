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

type CreateRoomModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CreateRoomModal = ({
  isOpen,
  setIsOpen,
}: CreateRoomModalProps) => {
  const handleClose = () => setIsOpen(false);

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
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              id="create-room-modal-title"
              variant="h4"
              component="h4"
            >
              {strings.features.rooms.createRoomModal.createRoom}
            </Typography>
            <CreateRoomForm />
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateRoomModal;
