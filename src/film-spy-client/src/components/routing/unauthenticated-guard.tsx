import React from 'react';

import Protected from './protected-guard';
import { selectIsAuthenticated, selectIsCheckingAuthentication } from 'app-slice';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const UnauthenticatedGuard = ({ children }: ChildrenProps): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);

  return (
    <Protected isEnabled={isCheckingAuthentication || !isAuthenticated} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default UnauthenticatedGuard;
