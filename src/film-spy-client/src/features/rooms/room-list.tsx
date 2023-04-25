import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import client from 'client';
import { Room } from 'models';
import { strings } from 'localization';

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRooms = async () => {
    setIsLoading(true);

    try {
      setRooms((await client.get<Room[]>('/api/rooms')).data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <>
      {isLoading && (
        <Box sx={{ dispay: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        rooms.length > 0 ? (
          <List>
            {rooms.map(({ id, name }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton>
                  <ListItemText>
                    {name}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>
            {strings.pages.rooms.noContent}
          </Typography>
        )
      )}
    </>
  );
};

export default RoomList;
