import React from 'react';
import type { ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';

import type { ChildrenProps } from 'props';

type ErrorLayoutProps = ChildrenProps & {
  code: number,
  name: string,
  description: string,
};

const ErrorLayout = ({ children, code, name, description }: ErrorLayoutProps): ReactElement => (
  <Stack spacing={2}>
    <Typography variant="h2" component="h2" align="center">
      {code}
    </Typography>
    <Typography variant="h3" component="h3" align="center">
      {name}
    </Typography>
    <Typography align="center">
      {description}
    </Typography>
    {children}
  </Stack>
);

export default ErrorLayout;
