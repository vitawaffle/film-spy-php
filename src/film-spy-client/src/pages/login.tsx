import React from 'react';
import type { ReactElement } from 'react';
import { Grid, Card, CardContent, Stack, Typography } from '@mui/material';

import { LoginForm } from 'features/login';
import { Centered } from 'features/ui';
import { strings } from 'localization';

const Login = (): ReactElement => (
  <Centered>
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h3" component="h3">
            {strings.common.logIn}
          </Typography>
          <LoginForm />
        </Stack>
      </CardContent>
    </Card>
  </Centered>
);

export default Login;
