import React from 'react';
import { Navigate } from 'react-router-dom';

import type { ChildrenProps } from 'props';

export type ProtectedGuardProps = ChildrenProps & {
  isEnabled?: boolean,
  navigateOnForbidden?: string,
};

const ProtectedGuard = ({ children, isEnabled, navigateOnForbidden }: ProtectedGuardProps): JSX.Element => {
  if (isEnabled === false)
    return <Navigate to={navigateOnForbidden ? navigateOnForbidden : '/home'} />;

  return <>{children}</>;
};

export default ProtectedGuard;
