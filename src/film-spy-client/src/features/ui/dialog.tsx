import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
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
  isLoading?: boolean,
  okButtonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
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
  isLoading,
  okButtonColor,
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
          <LoadingButton
            onClick={handleOkClick}
            disabled={isOkDisabled || isControlDisabled}
            loading={isLoading}
            variant="contained"
            color={okButtonColor ?? 'primary'}
          >
            {strings.common.ok}
          </LoadingButton>
          <Button
            onClick={handleCancelClick}
            disabled={isCancelDisabled || isControlDisabled || isLoading}
            variant="outlined"
          >
            {strings.common.cancel}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Dialog;
