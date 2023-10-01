import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Stack, TextField } from '@mui/material';

import client from 'client';
import { useCheckAuthentication, useInitCsrf } from 'features/auth';
import { strings } from 'localization';
import yup from 'schema';
import { isUnprocessableContentError } from 'utils';

const RegisterForm = (): React.ReactElement => {
  const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().password(),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password')]),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailNotUnique, setIsEmailNotUnique] = useState(false);
  const initCsrf = useInitCsrf();
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password, passwordConfirmation }: FieldValues): Promise<void> => {
    setIsLoading(true);
    setIsEmailNotUnique(false);

    try {
      await initCsrf();
      await client.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      await checkAuthentication();

      navigate('/home');
    } catch (error: unknown) {
      if (isUnprocessableContentError(error)) {
        setIsEmailNotUnique(true);
        return;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const emailHelperText = ((): string | undefined => {
    if (errors?.email?.type === 'required')
      return strings.validation.required;

    if (isEmailNotUnique)
      return strings.validation.emailNotUnique;

    return undefined;
  })();

  const passwordHelperText = {
    required: strings.validation.required,
    password: strings.validation.password,
  }[errors?.password?.type?.toString() ?? ''];

  const passwordConfirmationHelperText = {
    required: strings.validation.required,
    oneOf: strings.validation.passwordMismatch,
  }[errors?.passwordConfirmation?.type?.toString() ?? ''];

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Stack spacing={2}>
        <TextField
          {...register('name')}
          id="name"
          label={strings.common.name}
          required
          disabled={isLoading}
          autoFocus
          error={!!errors.name}
          helperText={
            errors?.name?.type === 'required'
              ? strings.validation.required
              : undefined
          }
        />
        <TextField
          {...register('email', {
            onChange: () => setIsEmailNotUnique(false),
          })}
          id="email"
          type="email"
          label={strings.common.email}
          required
          disabled={isLoading}
          error={!!errors.email || isEmailNotUnique}
          helperText={emailHelperText}
        />
        <TextField
          {...register('password')}
          id="password"
          type="password"
          label={strings.common.password}
          required
          disabled={isLoading}
          error={!!errors.password}
          helperText={passwordHelperText}
        />
        <TextField
          {...register('passwordConfirmation')}
          id="passwordConfirmation"
          type="password"
          label={strings.common.confirmPassword}
          required
          disabled={isLoading}
          error={!!errors.passwordConfirmation}
          helperText={passwordConfirmationHelperText}
        />
        <Button type="submit" variant="contained" loading={isLoading}>
          {strings.common.register}
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
