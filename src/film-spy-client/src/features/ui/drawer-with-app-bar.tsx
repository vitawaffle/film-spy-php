import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  List,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { ChildrenProps } from 'props';
import AppBar from './app-bar';
import Drawer from './drawer';
import DrawerHeader from './drawer-header';

const DrawerWithAppBar = ({ children }: ChildrenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={isOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Film Spy
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        </List>
      </Drawer>
      <Container>
        {children}
      </Container>
    </Box>
  );
};

export default DrawerWithAppBar;
