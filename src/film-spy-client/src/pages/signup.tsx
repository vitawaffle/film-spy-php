import React from 'react';
import type { ReactElement } from 'react';
import { Grid, Card, CardContent, Stack, Typography } from '@mui/material';

import { SignupForm } from 'features/signup';
import { strings } from 'localization';

const Signup = (): ReactElement => (
  <Grid container spacing={2}>
    <Grid item md={2} lg={4} />
    <Grid item xs={12} md={8} lg={4}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h3" component="h3">
              {strings.common.signUp}
            </Typography>
            <SignupForm />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
    <Grid item md={2} lg={4} />
  </Grid>
);

export default Signup;
