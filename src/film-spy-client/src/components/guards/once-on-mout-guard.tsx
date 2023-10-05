import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type GuardBasicProps from './guard-basic-props';

const OnceOnMoutGuard = ({ children, isEnabled, navigateOnForbidden }: GuardBasicProps): React.ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isEnabled === false)
      navigate(navigateOnForbidden ?? '/errors/forbidden');
  }, []);

  return <>{children}</>;
};

export default OnceOnMoutGuard;
