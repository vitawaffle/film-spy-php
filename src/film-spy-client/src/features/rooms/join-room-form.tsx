import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Stack, TextField, Button, LinearProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'schema';
import client from 'client';
import { isUnprocessableContentError } from 'utils';
import { strings } from 'localization';
import { useAppSelector } from 'hooks';
import { selectSelectedRoomId } from 'features/rooms';

const JoinRoomForm = () => {
  const joinRoomSchema = yup.object({
    password: yup.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(joinRoomSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const selectedRoomId = useAppSelector(selectSelectedRoomId);

  const joinRoom = async ({ password }: FieldValues) => {
    setIsLoading(true);
    setIsInvalidPassword(false);

    try {
      await client.post('/api/rooms/join', {
        room_id: selectedRoomId,
        password,
      });

      //
    } catch (error: unknown) {
      if (isUnprocessableContentError(error)) {
        setIsInvalidPassword(true);

        return;
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const passwordHelperText = () => {
    return isInvalidPassword
      ? strings.validation.invalidPassword
      : strings.features.rooms.joinRoomForm.keepEmpty;
  };

  return (
    <form onSubmit={handleSubmit(joinRoom)}>
      <Stack spacing={2}>
        {isLoading && <LinearProgress />}
        <TextField
          {...register('password')}
          id="password"
          label={strings.common.password}
          disabled={isLoading}
          autoFocus
          error={isInvalidPassword}
          helperText={passwordHelperText()}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {strings.common.join}
        </Button>
      </Stack>
    </form>
  );
};

export default JoinRoomForm;

