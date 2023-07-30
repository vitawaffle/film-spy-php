import React from 'react';

import Protected from './protected-guard';
import { selectIsAuthenticated, selectIsCheckingAuthentication } from 'app-slice';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const AuthenticatedGuard = ({ children }: ChildrenProps): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);

  return isCheckingAuthentication ? (
    <></>
  ) : (
    <Protected isEnabled={isAuthenticated} navigateOnForbidden="/error/unauthorized">
      {children}
    </Protected>
  );
};

export default AuthenticatedGuard;
