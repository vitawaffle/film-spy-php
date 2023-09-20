import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { LoginForm } from 'features/login';
import { Centered } from 'features/ui';
import { strings } from 'localization';

const Login = (): React.ReactElement => (
  <Centered>
    <Card sx={{ width: '300px' }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h4" component="h4" mb={4}>
            {strings.pages.logIn.title}
          </Typography>
          <LoginForm />
          <Typography variant="body1" component="p" mt={3} sx={{ color: 'text.secondary' }}>
            {strings.pages.logIn.noAccount + ' '}
            <Link to="/signup">
              {strings.common.signUp}
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </Centered>
);

export default Login;
