import React from 'react';
import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import type { ChildrenProps } from 'props';

export type ProtectedGuardProps = ChildrenProps & {
  isEnabled?: boolean,
  navigateOnForbidden?: string,
};

const ProtectedGuard = ({
  children,
  isEnabled,
  navigateOnForbidden,
}: ProtectedGuardProps): ReactElement => isEnabled === false ? (
  <Navigate to={navigateOnForbidden ? navigateOnForbidden : '/home'} />
) : (
  <>{children}</>
);

export default ProtectedGuard;
