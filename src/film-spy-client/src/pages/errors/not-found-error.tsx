import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ErrorLayout } from 'features/ui';
import { strings } from 'localization';

const NotFoundError = () => (
  <ErrorLayout
    code={404}
    name="Not Found"
    description={strings.pages.errors.notFound}
  >
    <Button component={Link} to="/home" variant="contained">
      {strings.common.home}
    </Button>
  </ErrorLayout>
);

export default NotFoundError;
