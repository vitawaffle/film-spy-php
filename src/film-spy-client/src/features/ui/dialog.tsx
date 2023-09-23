import React from 'react';
import { Button, Stack } from '@mui/material';

import Modal from './modal';
import type { ModalProps } from './modal';
import { strings } from 'localization';

export type DialogProps = ModalProps & {
  onOk?: () => Promise<void> | void,
  onCancel?: () => Promise<void> | void,
  isOkDisabled?: boolean,
  isCancelDisabled?: boolean,
  isControlDisabled?: boolean,
};

const Dialog = ({
  children,
  isOpen,
  onClose,
  id,
  title,
  onOk,
  onCancel,
  isOkDisabled,
  isCancelDisabled,
  isControlDisabled,
}: DialogProps): React.ReactElement => {
  const handleOkClick = async (): Promise<void> => {
    if (onOk)
      await onOk();
  };

  const handleCancelClick = async (): Promise<void> => {
    if (onCancel)
      await onCancel();

    if (onClose)
      await onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} id={id} title={title}>
      <Stack spacing={3}>
        {children}
        <Stack spacing={2} direction="row">
          <Button
            onClick={handleOkClick}
            disabled={isOkDisabled || isControlDisabled}
            variant="contained"
            color="error"
          >
            {strings.common.ok}
          </Button>
          <Button onClick={handleCancelClick} disabled={isCancelDisabled || isControlDisabled} variant="outlined">
            {strings.common.cancel}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Dialog;
