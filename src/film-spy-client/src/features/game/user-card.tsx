import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import type { User } from 'models';

export type UserProps = {
  user: User,
};

const UserCard = ({ user }: UserProps): React.ReactElement => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
