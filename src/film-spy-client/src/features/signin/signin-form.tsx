import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import yup from 'schema';
import { useCheckAuthentication } from 'hooks';
import { isUnprocessableContentError } from 'utils';
import client from 'client';

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

  return (
    <form>
      <Stack spacing={2}>
      </Stack>
    </form>
  );
};

export default SigninForm;
