import React from 'react';

import Guard from './guard';
import { selectIsAuthenticated, selectIsAuthenticationChecking } from 'features/auth';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const Authenticated = ({ children }: ChildrenProps): React.ReactElement => {
  const isAuthenticationChecking = useSelector(selectIsAuthenticationChecking);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Guard isEnabled={isAuthenticated} isLoading={isAuthenticationChecking} navigateOnForbidden="/login">
      {children}
    </Guard>
  );
};

export default Authenticated;
