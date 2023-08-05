import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
import '../scss/colors.scss';

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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgba(33, 37, 41, 1);
`;

const login = false; // předělat na store access_token e1f8764e-b19a-4219-8fda-dc24a3502f80

const LogButton = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const settings = ['Profile', 'Log Out'];

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  if (login) {
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
          <StyledNavLink to="#">My articles</StyledNavLink>
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={closeUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
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
              <img src="logo.svg" alt="logo" id="logo" />
            </IconButton>
          </NavLink>
          <StyledBox>
            <StyledNavLink to="#">Recent Articles</StyledNavLink>
            <StyledNavLink to="/about">About</StyledNavLink>
          </StyledBox>
          <LogButton />
        </StyledToolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};

export default AppHeader;
