import React from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { SignupForm } from 'features/signup';
import { Centered } from 'features/ui';
import { strings } from 'localization';

const Signup = (): ReactElement => (
  <Centered>
    <Card sx={{ width: '300px' }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h4" component="h4" mb={4}>
            {strings.pages.signUp.title}
          </Typography>
          <SignupForm />
          <Typography variant="body1" component="p" mt={3} sx={{ color: 'text.secondary' }}>
            {strings.pages.signUp.haveAccount + ' '}
            <Link to="/login">
              {strings.common.logIn}
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </Centered>
);

export default Signup;
