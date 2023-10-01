import React from 'react';
import Box from '@mui/material/Box';

import { ResendVerificationEmailButton } from 'features/email';
import { ErrorLayout } from 'features/ui';
import { strings } from 'localization';

const EmailNotVerified = (): React.ReactElement => (
  <ErrorLayout code={403} name="Forbidden" description={strings.pages.errors.emailNotVerified}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ResendVerificationEmailButton />
    </Box>
  </ErrorLayout>
);

export default EmailNotVerified;
