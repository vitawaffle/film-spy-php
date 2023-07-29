import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button, 
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  List,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  SportsEsports as SportsEsportsIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
} from '@mui/icons-material';

import AppBar from './app-bar';
import Drawer from './drawer';
import DrawerHeader from './drawer-header';
import DrawerLink from './drawer-link';
import { selectGame, selectRoom } from 'app-slice';
import { useAppSelector, useLogout } from 'hooks';
import {
  selectIsAuthenticated,
  selectIsCheckingAuthentication,
  selectIsLoggingOut,
} from 'app-slice';
import type { ChildrenProps } from 'props';
import { strings } from 'localization';

const DrawerWithAppBar = ({ children }: ChildrenProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleDrawerOpen = (): void => setIsOpen(true);
  const handleDrawerClose = (): void => setIsOpen(false);

  const handleLogoutClick = async (): Promise<void> => {
    await logout();

    navigate('/home');
  };

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const game = useAppSelector(selectGame);
  const room = useAppSelector(selectRoom);
  const isCheckingAuthentication = useAppSelector(selectIsCheckingAuthentication);
  const isLoggingOut = useAppSelector(selectIsLoggingOut);

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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Film Spy
          </Typography>
          {(isCheckingAuthentication || isLoggingOut) ? (
            <Box display="flex">
              <CircularProgress color="inherit" />
            </Box>
          ) : isAuthenticated ? (
            <Button onClick={handleLogoutClick} color="inherit">
              {strings.common.logOut}
            </Button>
          ) : (
            <>
              <Button component={Link} to="/signin" color="inherit">
                {strings.common.signUp}
              </Button>
              <Button component={Link} to="/login" color="inherit">
                {strings.common.logIn}
              </Button>
            </>
          )}
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
          <DrawerLink
            to="/home"
            text={strings.common.home}
            icon={<HomeIcon />}
            isDrawerOpen={isOpen}
          />
          {isAuthenticated && room && (
            <DrawerLink
              to="/room"
              text={strings.pages.home.currentRoom}
              icon={<SportsEsportsIcon />}
              isDrawerOpen={isOpen}
            />
          )}
          {isAuthenticated && game && (
            <DrawerLink
              to="/game"
              text={strings.features.ui.appBar.game}
              icon={<PlayCircleOutlineIcon />}
              isDrawerOpen={isOpen}
            />
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DrawerWithAppBar;
