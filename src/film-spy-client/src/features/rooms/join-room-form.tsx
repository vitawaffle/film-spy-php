import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, Stack, TextField } from '@mui/material';

import { roomJoined, selectSelectedRoom } from './rooms-slice';
import client from 'client';
import { strings } from 'localization';
import type { Room } from 'models';
import yup from 'schema';
import { useDispatch, useSelector } from 'store';
import { isUnprocessableContentError } from 'utils';

const JoinRoomForm = (): React.ReactElement => {
  const joinRoomSchema = yup.object({
    password: yup.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(joinRoomSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const selectedRoom = useSelector(selectSelectedRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinRoom = async ({ password }: FieldValues): Promise<void> => {
    setIsLoading(true);
    setIsInvalidPassword(false);

    try {
      await client.post('/api/rooms/join', {
        room_id: selectedRoom?.id,
        password,
      });

      dispatch(roomJoined(selectedRoom as Room));

      navigate('/rooms/' + selectedRoom?.id);
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

  const onChange = (): void => {
    setIsInvalidPassword(false);
  };

  const passwordHelperText = isInvalidPassword ? strings.validation.invalidPassword : strings.common.keepPasswordEmpty;

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
          helperText={passwordHelperText}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {strings.common.join}
        </Button>
      </Stack>
    </form>
  );
};

export default JoinRoomForm;
