import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { strings } from 'localization';
import type { Game } from 'models';

export type GameListItemProps = {
  game: Game,
};

const GameListItem = ({ game }: GameListItemProps): React.ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/games/${game.id}`);
  };

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary
      </ListItemButton>
    </ListItem>
  );
};