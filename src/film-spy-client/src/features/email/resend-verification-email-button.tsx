import React, { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { AxiosHeaders } from 'axios';
import Button from '@mui/lab/LoadingButton';

import client from 'client';
import { strings } from 'localization';
import type { ChildrenProps } from 'props';
import { isTooManyRequestsError } from 'utils';

export type ResendVerificationEmailButtonProps = ChildrenProps & {
  variant?: 'text' | 'outlined' | 'contained',
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
};

const ResendVerificationEmailButton = ({
  children,
  variant,
  color,
}: ResendVerificationEmailButtonProps): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft > 0) {
      setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    }
  }, [secondsLeft]);

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post('/email/verification-notification');
    } catch (error: unknown) {
      if (isTooManyRequestsError(error) && (error as AxiosError).response?.headers instanceof AxiosHeaders) {
        const retryAfter =
          ((error as AxiosError)?.response?.headers as AxiosHeaders).get('retry-after') as string;

        setSecondsLeft(parseInt(retryAfter));

        return;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isCountdownShown = secondsLeft > 0;

  return (
    <Button
      onClick={handleClick}
      variant={variant ?? 'contained'}
      color={color ?? 'primary'}
      loading={isLoading}
      disabled={secondsLeft > 0}
    >
      {(children ?? strings.features.email.resendVerificationEmailButton.resend) + ' '}
      {isCountdownShown && (
        <>({`${strings.features.email.resendVerificationEmailButton.retryAfter} ${secondsLeft}${
          strings.features.email.resendVerificationEmailButton.s}`})</>
      )}
    </Button>
  );
};

export default ResendVerificationEmailButton;
