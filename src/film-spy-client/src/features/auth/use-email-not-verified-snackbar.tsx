import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { ResendVerificationEmailButton } from 'features/email';
import { strings } from 'localization';
import { useSnackbar } from 'notistack';

const useEmailNotVerifiedSnackbar = (): () => void => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return () => {
    enqueueSnackbar(strings.snack.emailNotVerified, {
      variant: 'warning',
      persist: true,
      action: (snackbarId): React.ReactNode => (
        <>
          <ResendVerificationEmailButton variant="outlined" color="inherit">
            {strings.common.resend}
          </ResendVerificationEmailButton>
          <IconButton
            aria-label={strings.common.close}
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={(): void => { closeSnackbar(snackbarId); }}
          >
            <CloseIcon />
          </IconButton>
        </>
      ),
    });
  };
};

export default useEmailNotVerifiedSnackbar;
