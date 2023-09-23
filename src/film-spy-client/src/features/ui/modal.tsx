import React from 'react';
import { Backdrop, Box, Fade, Modal as MuiModal, Stack, Typography } from '@mui/material';

import type { ChildrenProps } from 'props';

export type ModalProps = ChildrenProps & {
  isOpen: boolean,
  onClose?: () => Promise<void> | void,
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

const Modal = ({ children, isOpen, onClose, id, title }: ModalProps): React.ReactElement => {
  const handleClose = async (): Promise<void> => {
    if (onClose)
      await onClose();
  };

  return (
    <MuiModal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: {
        timeout: 500,
      } }}
      aria-labelledby={`${id ?? ''}ModalTitle`}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id={`${id ?? ''}ModalTitle`} variant="h4" component="h4">
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
