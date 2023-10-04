import React from 'react';
import { Navigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

import type { ChildrenProps } from 'props';

export type GuardProps = ChildrenProps & {
  isEnabled?: boolean,
  isLoading?: boolean,
  navigateOnForbidden?: string,
};

// const Guard = ({ children, isEnabled, navigateOnForbidden }: GuardProps): React.ReactElement => isEnabled === false ? (
//   <Navigate to={navigateOnForbidden ? navigateOnForbidden : '/errors/forbidden'} />
// ) : <>{children}</>;

const Guard = ({ children, isEnabled, isLoading, navigateOnForbidden }: GuardProps): React.ReactElement => {
  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isEnabled === false)
    return <Navigate to={navigateOnForbidden ? navigateOnForbidden : '/errors/forbidden'} />;

  return <>{children}</>;
};

export default Guard;
