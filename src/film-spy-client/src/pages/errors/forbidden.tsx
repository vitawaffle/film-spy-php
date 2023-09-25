import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { ErrorLayout } from 'features/ui';
import { strings } from 'localization';

const Forbidden = (): React.ReactElement => (
  <ErrorLayout code={403} name="Forbidden" description={strings.pages.errors.forbidden}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button component={Link} to="/home" variant="contained">
        {strings.common.home}
      </Button>
    </Box>
  </ErrorLayout>
);

export default Forbidden;
