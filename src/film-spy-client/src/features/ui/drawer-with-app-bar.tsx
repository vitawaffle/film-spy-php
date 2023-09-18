import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  List,
} from '@mui/material';
import {
  Casino as CasinoIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import AppBar from './app-bar';
import Drawer from './drawer';
import DrawerHeader from './drawer-header';
import DrawerLink from './drawer-link';
import { selectIsAuthenticated, selectIsCheckingAuthentication, selectIsLoggingOut } from 'app-slice';
import { useAppSelector, useLogout } from 'hooks';
import { strings } from 'localization';
import type { ChildrenProps } from 'props';

const DrawerWithAppBar = ({ children }: ChildrenProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleDrawerOpen = (): void => {
    setIsOpen(true);
  };

  const handleDrawerClose = (): void => {
    setIsOpen(false);
  };

  const handleLogoutClick = async (): Promise<void> => {
    await logout();

    navigate('/home');
  };

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
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
              <Button component={Link} to="/signup" color="inherit">
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
          {isAuthenticated && (
            <DrawerLink
              to="/rooms"
              text={strings.common.rooms}
              icon={<CasinoIcon />}
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
