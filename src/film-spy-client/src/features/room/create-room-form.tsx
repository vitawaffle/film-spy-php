import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { Stack, TextField, Button, LinearProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import client from 'client';
import yup from 'schema';
import { isUnprocessableContentError } from 'utils';
import { strings } from 'localization';

type CreateRoomFormProps = {
  onSuccess?: () => void,
};

const CreateRoomForm = ({ onSuccess }: CreateRoomFormProps): JSX.Element => {
  const createRoomSchema = yup.object({
    name: yup.string().required().max(32),
    password: yup.string(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(createRoomSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isNameNotUnique, setIsNameNotUnique] = useState(false);

  const createRoom = async ({ name, password }: FieldValues): Promise<void> => {
    setIsLoading(true);
    setIsNameNotUnique(false);

    try {
      await client.post('/api/rooms/create', {
        name,
        password,
      });

      if (onSuccess)
        onSuccess();
    } catch (error: unknown) {
      if (isUnprocessableContentError(error)) {
        setIsNameNotUnique(true);
        return;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const nameHelperText = (): string | undefined => {
    if (errors?.name?.type === 'required')
      return strings.validation.required;

    if (isNameNotUnique)
      return strings.validation.notUniqueName;

    return undefined;
  };

  return (
    <form onSubmit={handleSubmit(createRoom)}>
      <Stack spacing={2}>
        {isLoading && <LinearProgress />}
        <TextField
          {...register('name')}
          id="name"
          label={strings.common.name}
          required
          disabled={isLoading}
          autoFocus
          error={!!errors.name || isNameNotUnique}
          helperText={nameHelperText()}
        />
        <TextField
          {...register('password')}
          id="password"
          type="password"
          label={strings.common.password}
          disabled={isLoading}
          helperText={strings.features.rooms.createRoomForm.keepEmpty}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {strings.common.create}
        </Button>
      </Stack>
    </form>
  );
};

export default CreateRoomForm;
