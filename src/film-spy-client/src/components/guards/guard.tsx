import React from 'react';
import { Navigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

import type GuardBasicProps from './guard-basic-props';

export type GuardProps = GuardBasicProps & {
  isLoading?: boolean,
};

const Guard = ({
  children,
  isEnabled,
  isLoading,
  navigateOnForbidden,
}: GuardProps): React.ReactElement => {
  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isEnabled === false)
    return <Navigate to={navigateOnForbidden ?? '/errors/forbidden'} />;

  return <>{children}</>;
};

export default Guard;
