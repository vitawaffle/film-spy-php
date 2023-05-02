import React from 'react';
import {
  Modal as MuiModal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { ChildrenProps } from 'props';

type ModalProps = ChildrenProps & {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  id?: string,
  title?: string,
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

const Modal = ({ children, isOpen, setIsOpen, id, title }: ModalProps) => {
  const handleClose = () => setIsOpen(false);
  return (
    <MuiModal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby={`${id ? id + '-' : ''}modal-title`}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              id={`${id ? id + '-' : ''}modal-title`}
              variant="h4"
              component="h4"
            >
              {title}
            </Typography>
            {children}
          </Stack>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
