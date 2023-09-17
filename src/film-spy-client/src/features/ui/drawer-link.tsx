import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type DrawerLinkProps = {
  isDrawerOpen: boolean,
  to: string,
  text: string,
  icon: ReactNode,
};

const DrawerLink = ({ isDrawerOpen, to, text, icon }: DrawerLinkProps): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(to);
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          minHeight: 48,
          justifyContent: isDrawerOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isDrawerOpen ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerLink;
