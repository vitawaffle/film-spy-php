import React from 'react';
import type { ReactElement } from 'react';

import Protected from './protected-guard';
import { selectIsAuthenticated, selectIsCheckingAuthentication } from 'app-slice';
import { useAppSelector } from 'hooks';
import type { ChildrenProps } from 'props';

const UnauthenticatedGuard = ({ children }: ChildrenProps): ReactElement => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);

  return isCheckingAuthentication ? (
    <></>
  ) : (
    <Protected isEnabled={!isAuthenticated} navigateOnForbidden="/home">
      {children}
    </Protected>
  );
};

export default UnauthenticatedGuard;
