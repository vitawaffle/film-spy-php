import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  LinearProgress,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import client from 'client';
import { useCheckAuthentication, useInitCsrf } from 'hooks';
import { isUnprocessableContentError } from 'utils';
import yup from 'schema';
import { strings } from 'localization';

const LoginForm = (): JSX.Element => {
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
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();
  const initCsrf = useInitCsrf();

  const login = async ({ email, password, isRemember }: FieldValues): Promise<void> => {
    setIsLoading(true);
    setIsInvalidCredentials(false);

    try {
      await initCsrf();
      await client.post('/login', {
        email,
        password,
        remember: isRemember,
      });
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

  const onChange = (): void => setIsInvalidCredentials(false);

  const passwordHelperText = (): string | undefined => {
    if (errors?.password?.type === 'required')
      return strings.validation.required;

    if (isInvalidCredentials)
      return strings.validation.invalidCredentials;

    return undefined;
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={2}>
        {isLoading && <LinearProgress />}
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
          helperText={passwordHelperText()}
        />
        <FormGroup>
          <FormControlLabel
            label={strings.common.rememberMe}
            control={<Checkbox {...register('isRemember')} />}
          />
        </FormGroup>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {strings.common.logIn}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
