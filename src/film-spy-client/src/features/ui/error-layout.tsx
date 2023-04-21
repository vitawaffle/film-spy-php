import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ChildrenProps } from 'props';

type ErrorLayoutProps = ChildrenProps & {
  code: number,
  name: string,
  description: string,
};

const ErrorLayout = ({
  children,
  code,
  name,
  description,
}: ErrorLayoutProps) => (
  <Stack spacing={2}>
    <Typography variant="h2" component="h2">
      {code}
    </Typography>
    <Typography variant="h3" component="h3">
      {name}
    </Typography>
    <Typography>
      {description}
    </Typography>
    {children}
  </Stack>
);

export default ErrorLayout;
