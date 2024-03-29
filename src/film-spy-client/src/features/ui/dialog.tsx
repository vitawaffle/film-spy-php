import React from 'react';
import type { ReactElement } from 'react';
import { Stack, Button } from '@mui/material';

import { Modal } from 'features/ui';
import type { ModalProps } from 'features/ui';
import { strings } from 'localization';

type DialogProps = ModalProps & {
  onOk?: () => Promise<void> | void,
  onCancel?: () => Promise<void> | void,
  isOkDisabled?: boolean,
  isCancelDisabled?: boolean,
  isControlDisabled?: boolean,
};

const Dialog = ({
  children,
  isOpen,
  id,
  title,
  onOk,
  onCancel,
  onClose,
  isOkDisabled,
  isCancelDisabled,
  isControlDisabled,
}: DialogProps): ReactElement => {
  const handleOkClick = async (): Promise<void> => {
    if (onOk)
      await onOk();
  };

  const handleCancelClick = async (): Promise<void> => {
    if (onCancel)
      await onCancel();

    if (onClose)
      onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      id={id}
      title={title}
    >
      <Stack spacing={3} direction="column">
        {children}
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="error"
            disabled={isOkDisabled || isControlDisabled}
            onClick={handleOkClick}
          >
            {strings.common.ok}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelClick}
            disabled={isCancelDisabled || isControlDisabled}
          >
            {strings.common.cancel}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default Dialog;
