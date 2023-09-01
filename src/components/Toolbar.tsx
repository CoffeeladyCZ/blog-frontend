import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setLogin } from '../store/login';
import { StyledNavLink } from '../styled/styled';

import { ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import '../scss/colors.scss';
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

const LoginSection: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login.login);

  useEffect(() => {
    const token = Cookies.get('token');
    const isLogin: boolean = token ? true : false;
    dispatch(setLogin(isLogin));
  }, [dispatch]);

  /** Opens user menu */
  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  /** Closes user menu */
  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  /** Log out user from application */
  const logoutUser = () => {
    dispatch(setLogin(false));
  };

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
          <StyledNavLink to="/articles/">My articles</StyledNavLink>
          <StyledNavLink to="/article/new">Create articles</StyledNavLink>
          <Tooltip title="Open menu">
            <IconButton onClick={openUserMenu}>
              <Avatar alt="avatar" srcSet="../assets/logo_A.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="userMenu"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={closeUserMenu}>
            <MenuItem onClick={closeUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={logoutUser}>
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>
          </Menu>
        </StyledBoxAvatar>
      </>
    );
  }
};

const AppHeader: React.FC = () => {
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
            <StyledNavLink to="/about">About</StyledNavLink>
          </StyledBox>
          <LoginSection />
        </StyledToolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};

export default AppHeader;
