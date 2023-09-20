import React from 'react';
import Box from '@mui/material/Box';

import './centered.scss';
import type { ChildrenProps } from 'props';

const Centered = ({ children }: ChildrenProps): React.ReactElement => (
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
