import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft as ChevronLeftIcon,
  Group as GroupIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  SportsEsports as SportsEsportsIcon,
} from '@mui/icons-material';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import type { AppBarProps as MuiAppBarProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { CSSObject, Theme } from '@mui/material/styles';

import {
  selectIsAuthenticated,
  selectIsEmailVerified,
  selectIsLoggingOut,
  selectIsUnauthenticated,
  useLogOut,
} from 'features/auth';
import { strings } from 'localization';
import type { ChildrenProps } from 'props';
import { useSelector } from 'store';

const drawerWidth = 240;

type AppBarProps = MuiAppBarProps & {
  open?: boolean,
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

type DrawerLinkProps = {
  isDrawerOpen: boolean,
  to: string,
  text: string,
  icon: React.ReactNode,
};

const DrawerLink = ({ isDrawerOpen, to, text, icon }: DrawerLinkProps): React.ReactElement => {
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

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Header = ({ children }: ChildrenProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const logOut = useLogOut();
  const navigate = useNavigate();

  const handleDrawerOpen = (): void => {
    setIsOpen(true);
  };

  const handleDrawerClose = (): void => {
    setIsOpen(false);
  };

  const handleLogoutClick = async (): Promise<void> => {
    await logOut();
    navigate('/home');
  };

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isUnauthenticated = useSelector(selectIsUnauthenticated);
  const isLoggingOut = useSelector(selectIsLoggingOut);
  const isEmailVerified = useSelector(selectIsEmailVerified);

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
          {isAuthenticated && (
            <LoadingButton
              onClick={handleLogoutClick}
              variant="text"
              loading={isLoggingOut}
              color="inherit"
            >
              {strings.common.logOut}
            </LoadingButton>
          )}
          {isUnauthenticated && (
            <>
              <Button component={Link} to="/register" color="inherit">
                {strings.common.register}
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
          {isAuthenticated && isEmailVerified && (
            <>
              <DrawerLink
                to="/rooms"
                text={strings.common.rooms}
                icon={<GroupIcon />}
                isDrawerOpen={isOpen}
              />
              <DrawerLink
                to="/games"
                text={strings.common.games}
                icon={<SportsEsportsIcon />}
                isDrawerOpen={isOpen}
              />
            </>
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

export default Header;
