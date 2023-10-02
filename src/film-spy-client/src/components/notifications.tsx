import React from 'react';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { strings } from 'localization';
import type { ChildrenProps } from 'props';

const Notifications = ({ children }: ChildrenProps): React.ReactElement => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={6000}
      action={(snackbarId): React.ReactNode => (
        <IconButton
          aria-label={strings.common.close}
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={(): void => { closeSnackbar(snackbarId); }}
        >
          <CloseIcon />
        </IconButton>
      )}
      preventDuplicate={true}
    >
      {children}
    </SnackbarProvider>
  );
};

export default Notifications;
