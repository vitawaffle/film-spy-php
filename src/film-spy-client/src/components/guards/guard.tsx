import React from 'react';
import { Navigate } from 'react-router-dom';

import type { ChildrenProps } from 'props';

export type GuardProps = ChildrenProps & {
  isEnabled?: boolean,
  navigateOnForbidden?: string,
};

const Guard = ({ children, isEnabled, navigateOnForbidden }: GuardProps): React.ReactElement => isEnabled === false ? (
  <Navigate to={navigateOnForbidden ? navigateOnForbidden : '/errors/forbidden'} />
) : <>{children}</>;

export default Guard;
