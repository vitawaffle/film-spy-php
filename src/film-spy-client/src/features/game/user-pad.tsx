import React from 'react';
import Grid from '@mui/material/Grid';

import useCurrentGame from './use-current-game';
import UserCard from './user-card';

const UserPad = (): React.ReactElement => {
  const currentGame = useCurrentGame();

  return (
    <Grid container spacing={2}>
      {currentGame.users.map((user, i) => (
        <Grid key={i} item xs={4}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserPad;
