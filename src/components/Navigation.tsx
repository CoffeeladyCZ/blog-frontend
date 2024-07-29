import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from '@mui/material';
import { Login } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

import { RootState } from '../store/store';
import { setLogin } from '../store/login';
import { StyledNavLink, StyledNavButton } from '../styled/styled';

import logo from '../assets/logo.svg';

import Notification from './Notification';
import LanguageSwitch from './LanguageSwitch';

type LoginSectionType = {
  onUserAlert: (item: boolean) => void;
  onCloseMenu: (item: boolean) => void;
};

const StyledAppBar = styled(AppBar)`
  box-shadow: none;
`;

const StyledNavBox = styled(Box)`
  flex-grow: 1;
`;

const StyledLoginBox = styled(Box)`
  flex-grow: 0;
`;

const StyledLanguageBox = styled(Box)`
  flex-grow: 0;
`;

const LoginSection: React.FC<LoginSectionType> = ({ onUserAlert, onCloseMenu }) => {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login.login);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginPages = [
    {
      value: 'my-article',
      name: t('navigation.myArticles'),
      link: '/articles',
      testId: 'navMyArticles'
    },
    {
      value: 'new-article',
      name: t('navigation.newArticle'),
      link: '/article/new',
      testId: 'navNewArticles'
    },
    { value: 'logout', name: t('logout'), link: '', testId: 'logout' }
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    const isLogin: boolean = token ? true : false;
    dispatch(setLogin(isLogin));
  }, [dispatch]);

  const handleClick = (value: string) => {
    if (value === 'logout') {
      logoutUser(false);
    } else {
      onCloseMenu(true);
    }
  };

  /** Log out user from application */
  const logoutUser = (disconnected: boolean) => {
    dispatch(setLogin(false));
    Cookies.remove('token');
    localStorage.removeItem('loginTime');
    clearInterval(expirationCheckInterval);

    //props drilling to parent component for display notification
    onUserAlert(true);

    // if an hour has passed, the user is logged out
    if (disconnected) {
      navigate('/disconnected');
      return;
    }
    navigate('/recent-articles');
  };

  const checkLoginExpiration = () => {
    const loginTimeFromStorage = localStorage.getItem('loginTime');

    if (loginTimeFromStorage !== null) {
      const currentTime: Date = new Date();
      const loginTime = new Date(loginTimeFromStorage);
      const timeDifferenceMinutes = (currentTime.getTime() - loginTime.getTime()) / 1000;
      if (timeDifferenceMinutes >= 3600) {
        logoutUser(true);
      }
    }
  };

  const expirationCheckInterval = setInterval(checkLoginExpiration, 600000); // 10 minutes

  if (!login) {
    return (
      <NavLink to="/login">
        <Button data-testid="navLoginButton" startIcon={<Login />}>
          {t('login')}
        </Button>
      </NavLink>
    );
  } else {
    return (
      <>
        <Box
          data-testid="loginSection"
          sx={{
            display: { xs: 'none', sm: 'flex' }
          }}>
          {loginPages.map((page) => (
            <StyledNavButton
              key={page.value}
              onClick={() => handleClick(page.value)}
              sx={{ my: 2, display: 'block' }}>
              <StyledNavLink key={page.value} to={page.link} data-testid={page.testId}>
                {page.name}
              </StyledNavLink>
            </StyledNavButton>
          ))}
        </Box>
        <List
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
            padding: 0
          }}>
          {loginPages.map((item) => (
            <ListItem key={item.value} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} onClick={() => handleClick(item.value)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
};

const Navigation: React.FC = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const setUserAlert: (item: boolean) => void = (item) => {
    setShowSuccessAlert(item);
  };
  const { t } = useTranslation();
  const pages = [
    {
      value: 'recent-article',
      name: t('navigation.recentArticles'),
      link: '/recent-articles',
      testId: 'navRecentArticles'
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;
  const container = window !== undefined ? () => document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img src={logo} alt="logo" id="logo" />
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <LoginSection onUserAlert={setUserAlert} onCloseMenu={handleDrawerToggle} />
      </List>
    </Box>
  );

  return (
    <Box display="flex">
      <CssBaseline />
      <StyledAppBar color="secondary">
        {showSuccessAlert && (
          <Notification
            severity="info"
            message="User has been logged out."
            open={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
          />
        )}
        <Container max-width="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <img src={logo} alt="logo" id="logo" />
            </IconButton>
            <StyledNavBox sx={{ display: { xs: 'none', sm: 'block' } }}>
              {pages.map((page) => (
                <StyledNavButton key={page.value}>
                  <StyledNavLink to={page.link} data-testid={page.testId}>
                    {page.name}
                  </StyledNavLink>
                </StyledNavButton>
              ))}
            </StyledNavBox>
            <StyledLoginBox sx={{ display: { xs: 'none', sm: 'block' } }}>
              <LoginSection onUserAlert={setUserAlert} onCloseMenu={handleDrawerToggle} />
            </StyledLoginBox>
            <StyledLanguageBox>
              <LanguageSwitch />
            </StyledLanguageBox>
            
          </Toolbar>
        </Container>
      </StyledAppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}>
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navigation;
