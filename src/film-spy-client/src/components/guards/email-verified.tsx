import React from 'react';

import Guard from './guard';
import { selectIsEmailVerified } from 'features/auth';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const EmailVerified = ({ children }: ChildrenProps): React.ReactElement => {
  const isEmailVerified = useSelector(selectIsEmailVerified);

  return (
    <Guard isEnabled={isEmailVerified} navigateOnForbidden="/errors/email-not-verified">
      {children}
    </Guard>
  );
};

export default EmailVerified;
