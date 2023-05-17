import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import { strings } from 'localization';
import { Modal } from 'features/ui';
import { useLoadUsers, UserList } from 'features/room';
import { selectUser } from 'app-slice';
import { useAppSelector, useCheckAuthentication } from 'hooks';
import client from 'client';

const Room = () => {
  const loadUsers = useLoadUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  const [isDeleteRoomModalOpen, setIsDeleteRoomModalOpen] = useState(false);
  const [isDeleteRoomLoading, setIsDeleteRoomLoading] = useState(false);

  const handleDeleteRoomClick = () => {
    setIsDeleteRoomModalOpen(true);
  };

  const user = useAppSelector(selectUser);
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();

  const handleDeleteRoomOkClick = async () => {
    setIsDeleteRoomLoading(true);

    try {
      await client.post('/api/rooms/delete', {
        room_id: user?.room?.id ?? 0,
      });

      await checkAuthentication();

      navigate('/home');
    } finally {
      setIsDeleteRoomLoading(false);
    }
  };

  const handleDeleteRoomCancelClick = () => {
    setIsDeleteRoomModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isDeleteRoomModalOpen}
        setIsOpen={setIsDeleteRoomModalOpen}
        id="delete-room"
        title={strings.common.deleteRoom + '?'}
      >
        <Stack spacing={3} direction="column">
          {isDeleteRoomLoading && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="error"
              disabled={isDeleteRoomLoading}
              onClick={handleDeleteRoomOkClick}
            >
              {strings.common.ok}
            </Button>
            <Button variant="outlined" onClick={handleDeleteRoomCancelClick}>
              {strings.common.cancel}
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h3" component="h3">
                  {strings.common.players}
                </Typography>
                <UserList />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteRoomClick}
                >
                  {strings.common.deleteRoom}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
