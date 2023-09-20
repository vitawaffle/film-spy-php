import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import PestControlOutlinedIcon from '@mui/icons-material/PestControlOutlined';

import Centered from './centered';
import type { ChildrenProps } from 'props';

export type ErrorLayoutProps = ChildrenProps & {
  code: number,
  name: string,
  description: string,
};

const ErrorLayout = ({ children, code, name, description }: ErrorLayoutProps): React.ReactElement => (
  <Centered>
    <Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} mb={3}>
        <PestControlOutlinedIcon sx={{ fontSize: 225, color: 'text.secondary' }} />
      </Box>
      <Typography
        variant="h2"
        component="h2"
        align="center"
        sx={{ fontSize: 75, color: 'text.secondary', fontWeight: 450 }}
        mb={1}
      >
        {code}
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        align="center"
        sx={{ fontSize: 40, color: 'text.secondary', fontWeight: 400 }}
        mb={3}
      >
        {name}
      </Typography>
      <Typography align="center" mb={4}>
        {description}
      </Typography>
      {children}
    </Stack>
  </Centered>
);

export default ErrorLayout;
