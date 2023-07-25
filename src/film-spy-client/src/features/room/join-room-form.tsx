import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button, LinearProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { selectSelectedRoom, roomJoined } from 'app-slice';
import client from 'client';
import { useAppSelector, useAppDispatch } from 'hooks';
import type { Room } from 'models';
import yup from 'schema';
import { isUnprocessableContentError } from 'utils';
import { strings } from 'localization';

const JoinRoomForm = (): JSX.Element => {
  const joinRoomSchema = yup.object({
    password: yup.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(joinRoomSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const selectedRoom = useAppSelector(selectSelectedRoom) as Room;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const joinRoom = async ({ password }: FieldValues): Promise<void> => {
    setIsLoading(true);
    setIsInvalidPassword(false);

    try {
      await client.post('/api/rooms/join', {
        room_id: selectedRoom.id,
        password,
      });

      dispatch(roomJoined(selectedRoom));

      navigate('/room');
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

  const passwordHelperText = (): string => {
    return isInvalidPassword
      ? strings.validation.invalidPassword
      : strings.features.rooms.joinRoomForm.keepEmpty;
  };

  const onChange = (): void => setIsInvalidPassword(false);

  return (
    <form onSubmit={handleSubmit(joinRoom)}>
      <Stack spacing={2}>
        {isLoading && <LinearProgress />}
        <TextField
          {...register('password', { onChange })}
          id="password"
          type="password"
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
