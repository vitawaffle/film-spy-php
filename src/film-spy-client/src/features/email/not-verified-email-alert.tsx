import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import { selectIsAuthenticated, selectIsEmailVerified } from 'features/auth';
import { strings } from 'localization';
import { useSelector } from 'store';

const NotVerifiedEmailAlert = (): React.ReactElement => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isEmailVerified = useSelector(selectIsEmailVerified);
  const [isShown, setIsShown] = useState(!isEmailVerified);

  const handleClose = (): void => {
    setIsShown(false);
  };

  return isAuthenticated ? (
    <Snackbar open={isShown} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        {strings.features.email.notVerifiedEmailAlert.title}
      </Alert>
    </Snackbar>
  ) : <></>;
};

export default NotVerifiedEmailAlert;
