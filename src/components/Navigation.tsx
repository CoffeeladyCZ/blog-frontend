import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { RootState } from '../store/store';
import { setLogin } from '../store/login';
import { StyledNavLink } from '../styled/styled';

import logo from '../assets/logo.svg';

const StyledBox = styled(Box)`
  flex-grow: 1;
  display: flex;
  gap: 2rem;
`;

const StyledBoxAvatar = styled(Box)`
  flex-grow: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledContainer = styled(Container)`
  max-width: 1152px;
`;

const StyledAppBar = styled(AppBar)`
  box-shadow: none;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledMenu = styled(Menu)`
  margin-top: 45px;
`;

const LoginSection: React.FC = () => {
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login.login);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    const isLogin: boolean = token ? true : false;
    dispatch(setLogin(isLogin));
  }, [dispatch]);

  /** Log out user from application */
  const logoutUser = (disconnected: boolean) => {
    dispatch(setLogin(false));
    Cookies.remove('token');
    localStorage.removeItem('loginTime');
    clearInterval(expirationCheckInterval);

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
        <Button color="primary" endIcon={<ArrowForward />}>
          Log in
        </Button>
      </NavLink>
    );
  } else {
    return (
      <>
        <StyledBoxAvatar>
          <StyledNavLink to="/articles/">My Articles</StyledNavLink>
          <StyledNavLink to="/article/new">Create Articles</StyledNavLink>
          <Tooltip title="Open menu">
            <IconButton data-testid="menuButton" onClick={(e) => setUserMenu(e.currentTarget)}>
              <Avatar alt="avatar" srcSet="../assets/logo_A.jpg" />
            </IconButton>
          </Tooltip>
          <StyledMenu
            id="userMenu"
            anchorEl={userMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(userMenu)}
            onClose={() => setUserMenu(null)}>
            <MenuItem onClick={() => setUserMenu(null)}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => logoutUser(false)} data-testid="logout">
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>
          </StyledMenu>
        </StyledBoxAvatar>
      </>
    );
  }
};

const Navigation: React.FC = () => {
  return (
    <StyledAppBar position="static" color="secondary">
      <StyledContainer>
        <StyledToolbar variant="dense">
          <NavLink to="/">
            <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <img src={logo} alt="logo" id="logo" />
            </IconButton>
          </NavLink>
          <StyledBox>
            <StyledNavLink to="/recent-articles">Recent Articles</StyledNavLink>
          </StyledBox>
          <LoginSection />
        </StyledToolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};

export default Navigation;
