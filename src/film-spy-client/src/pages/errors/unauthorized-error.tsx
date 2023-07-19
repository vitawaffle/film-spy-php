import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

import { ErrorLayout } from 'features/ui';
import { strings } from 'localization';

const UnauthorizedError = (): JSX.Element => (
  <ErrorLayout
    code={401}
    name="Unauthozied"
    description={strings.pages.errors.unauthorized}
  >
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button component={Link} to='/login' variant="contained">
        {strings.common.logIn}
      </Button>
      <Button component={Link} to="/home" variant="outlined">
        {strings.common.home}
      </Button>
    </Stack>
  </ErrorLayout>
);

export default UnauthorizedError;
