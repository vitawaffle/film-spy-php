import React from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { ErrorLayout } from 'features/ui';
import { strings } from 'localization';

const NotFoundError = (): ReactElement => (
  <ErrorLayout
    code={404}
    name="Not Found"
    description={strings.pages.errors.notFound}
  >
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button component={Link} to="/home" variant="contained">
        {strings.common.home}
      </Button>
    </Box>
  </ErrorLayout>
);

export default NotFoundError;
