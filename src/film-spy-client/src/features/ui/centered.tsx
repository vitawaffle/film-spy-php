import React from 'react';
import type { ReactElement } from 'react';
import Box from '@mui/material/Box';

import type { ChildrenProps } from 'props';
import './centered.scss';

const Centered = ({ children }: ChildrenProps): ReactElement => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }} className="centered">
    {children}
  </Box>
);

export default Centered;
