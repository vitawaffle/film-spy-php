import React, { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, Stack, TextField } from '@mui/material';

import { selectSelectedRoom } from './rooms-slice';
import client from 'client';
import { strings } from 'localization';
import yup from 'schema';
import { useSelector } from 'store';
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
  const navigate = useNavigate();

  return (
    <form>
    </form>
  );
};

export default JoinRoomForm;
