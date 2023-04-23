import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'schema';
import client from 'client';
import { useCheckAuthentication } from 'hooks';
import { strings } from 'localization';
import { isUnprocessableContentError } from 'utils';

const LoginForm = () => {
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

  const login = async ({ email, password, isRemember }: FieldValues) => {
    setIsLoading(true);
    setIsInvalidCredentials(false);

    try {
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

  const onChange = () => setIsInvalidCredentials(false);

  const passwordHelperText = () => {
    if (errors?.password?.type === 'required')
      return strings.validation.required;

    if (isInvalidCredentials)
      return strings.validation.invalidCredentials;

    return undefined;
  };

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
