import React from 'react';
import { Stack, Button } from '@mui/material';
import { Modal, ModalProps } from 'features/ui';
import { strings } from 'localization';

type DialogProps = ModalProps & {
  onOk?: () => Promise<void>,
  onCancel?: () => Promise<void>,
  isOkDisabled?: boolean,
};

const Dialog = ({
  children,
  isOpen,
  setIsOpen,
  id,
  title,
  onOk,
  onCancel,
  isOkDisabled,
}: DialogProps) => {
  const handleOkClick = async () => {
    if (onOk)
      await onOk();
  };

  const handleCancelClick = async () => {
    if (onCancel)
      await onCancel();

    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      id={id}
      title={title}
    >
      <Stack spacing={3} direction="column">
        {children}
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="error"
            disabled={isOkDisabled}
            onClick={handleOkClick}
          >
            {strings.common.ok}
          </Button>
          <Button variant="outlined" onClick={handleCancelClick}>
            {strings.common.cancel}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Dialog;
