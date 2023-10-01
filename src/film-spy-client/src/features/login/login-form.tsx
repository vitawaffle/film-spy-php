import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/lab/LoadingButton';
import { Checkbox, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import client from 'client';
import { useCheckAuthentication, useInitCsrf } from 'features/auth';
import { strings } from 'localization';
import yup from 'schema';
import { isUnprocessableContentError } from 'utils';

const LoginForm = (): React.ReactElement => {
  const loginSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    isRemember: yup.boolean(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const initCsrf = useInitCsrf();
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const login = async ({ email, password, isRemember }: FieldValues): Promise<void> => {
    setIsLoading(true);
    setIsInvalidCredentials(false);

    try {
      await initCsrf();
      await client.post('/login', { email, password, remember: isRemember });
      await checkAuthentication();

      navigate('/home');
    } catch (error: unknown) {
      if (isUnprocessableContentError(error)) {
        setIsInvalidCredentials(true);
        return;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (): void => {
    setIsInvalidCredentials(false);
  };

  const passwordHelperText = ((): string | undefined => {
    if (errors?.password?.type === 'required')
      return strings.validation.required;

    if (isInvalidCredentials)
      return strings.validation.invalidCredentials;

    return undefined;
  })();

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={2}>
        <TextField
          {...register('email', { onChange })}
          id="email"
          type="email"
          label={strings.common.email}
          required
          disabled={isLoading}
          autoFocus
          error={!!errors.email || isInvalidCredentials}
          helperText={
            errors?.email?.type === 'required'
              ? strings.validation.required
              : undefined
          }
        />
        <TextField
          {...register('password', { onChange })}
          id="password"
          type="password"
          label={strings.common.password}
          required
          disabled={isLoading}
          error={!!errors.password || isInvalidCredentials}
          helperText={passwordHelperText}
        />
        <FormGroup>
          <FormControlLabel
            label={strings.common.isRemember}
            control={<Checkbox {...register('isRemember')} disabled={isLoading} />}
          />
        </FormGroup>
        <Button type="submit" variant="contained" loading={isLoading} loadingPosition="start">
          {strings.common.logIn}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
