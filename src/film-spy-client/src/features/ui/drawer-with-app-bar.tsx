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
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { ChildrenProps } from 'props';
import { useAppSelector, useLogout } from 'hooks';
import { selectIsAuthenticated } from 'app-slice';
import { strings } from 'localization';
import AppBar from './app-bar';
import Drawer from './drawer';
import DrawerHeader from './drawer-header';
import DrawerLink from './drawer-link';

const links = [
  {
    to: '/home',
    text: strings.common.home,
    icon: <HomeIcon />
  },
];

const DrawerWithAppBar = ({ children }: ChildrenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);

  const handleLogoutClick = async () => {
    await logout();

    navigate('/home');
  };

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
          {!isAuthenticated && (
            <>
              <Button component={Link} to="/signin" color="inherit">
                {strings.common.signIn}
              </Button>
              <Button component={Link} to="/login" color="inherit">
                {strings.common.logIn}
              </Button>
            </>
          )}
          {isAuthenticated && (
            <Button onClick={handleLogoutClick} color="inherit">
              {strings.common.logOut}
            </Button>
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
          {links.map(({ to, text, icon }, i) => (
            <DrawerLink
              key={i}
              to={to}
              text={text}
              icon={icon}
              isDrawerOpen={isOpen}
            />
          ))}
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
