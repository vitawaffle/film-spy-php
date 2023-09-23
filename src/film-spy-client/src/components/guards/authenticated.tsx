import React from 'react';

import Guard from './guard';
import { selectIsAuthenticated, selectIsAuthenticationChecking } from 'features/auth';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const Authenticated = ({ children }: ChildrenProps): React.ReactElement => {
  const isCheckingAuthentication = useSelector(selectIsAuthenticationChecking);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isCheckingAuthentication ? <></> : (
    <Guard isEnabled={isAuthenticated} navigateOnForbidden="/login">
      {children}
    </Guard>
  );
};

export default Authenticated;
