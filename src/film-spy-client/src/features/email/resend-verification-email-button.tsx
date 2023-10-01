import React, { useState } from 'react';
import Button from '@mui/lab/LoadingButton';

import { strings } from 'localization';

const ResendVerificationEmailButton = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
  };

  return (
    <Button onClick={handleClick} variant="contained" loading={isLoading} loadingPosition="start">
      {strings.features.email.resendVerificationEmailButton.resend}
    </Button>
  );
};

export default ResendVerificationEmailButton;
