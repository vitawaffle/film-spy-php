import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField, Button } from '@mui/material';
import yup from 'schema';
import { useCheckAuthentication } from 'hooks';
import { isUnprocessableContentError } from 'utils';
import client from 'client';
import { strings } from 'localization';

const SigninForm = () => {
  const signinSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().password(),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password')]),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailNotUnique, setIsEmailNotUnique] = useState(false);
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const signin = async({
    name,
    email,
    password,
    passwordConfirmation,
  }: FieldValues) => {
    setIsLoading(true);
    setIsEmailNotUnique(false);

    try {
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

  const emailHelperText = () => {
    if (errors?.email?.type === 'required')
      return strings.validation.required;

    if (errors?.email?.type === 'email')
      return strings.validation.email;

    return undefined;
  };

  const passwordHelperText = () => {
    if (errors?.password?.type === 'required')
      return strings.validation.required;

    if (errors?.password?.type === 'password')
      return strings.validation.password;

    return undefined;
  };

  const passwordConfirmationHelperText = () => {
    if (errors?.passwordConfirmation?.type === 'required')
      return strings.validation.required;

    if (errors?.passwordConfirmation?.type === 'oneOf')
      return strings.validation.passwordMismatch;

    return undefined;
  };

  return (
    <form onSubmit={handleSubmit(signin)}>
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
          {...register('email')}
          id="email"
          type="email"
          label={strings.common.email}
          required
          disabled={isLoading}
          error={!!errors.email}
          helperText={emailHelperText()}
        />
        <TextField
          {...register('password')}
          id="password"
          type="password"
          label={strings.common.password}
          required
          disabled={isLoading}
          error={!!errors.password}
          helperText={passwordHelperText()}
        />
        <TextField
          {...register('passwordConfirmation')}
          id="passwordConfirmation"
          type="password"
          label={strings.common.passwordConfirmation}
          required
          disabled={isLoading}
          error={!!errors.passwordConfirmation}
          helperText={passwordConfirmationHelperText()}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {strings.common.signIn}
        </Button>
      </Stack>
    </form>
  );
};

export default SigninForm;
