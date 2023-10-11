import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Stack, TextField } from '@mui/material';

import client from 'client';
import { useCurrentRoomId } from 'features/room';
import { strings } from 'localization';
import yup from 'schema';

export type ChangeRoomPasswordForm = {
  onSuccess?: () => void | Promise<void>,
};

const ChangeRoomPasswordForm = ({ onSuccess }: ChangeRoomPasswordForm): React.ReactElement => {
  const changeRoomPasswordSchema = yup.object({
    password: yup.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(changeRoomPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const currentRoomId = useCurrentRoomId();

  const changeRoomPassword = async ({ password }: FieldValues): Promise<void> => {
    setIsLoading(true);

    try {
      await client.post(`/api/rooms/${currentRoomId}/change-password`, { password });

      if (onSuccess)
        await onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(changeRoomPassword)}>
      <Stack spacing={2}>
        <TextField
          {...register('password')}
          id="password"
          type="password"
          label={strings.common.password}
          disabled={isLoading}
          autoFocus
        />
        <Button type="submit" variant="contained" loading={isLoading}>
          {strings.common.change}
        </Button>
      </Stack>
    </form>
  );
};

export default ChangeRoomPasswordForm;
