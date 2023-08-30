import { Box, Container, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)`
  height: 100vh;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const StyledGrid = styled(Grid)`
  max-width: 1152px;
`;

export const StyledBox = styled(Box)`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgba(33, 37, 41, 1); // upravit na globální proměnnou
`;

export const StyledHeadline1 = styled(Typography)`
  font-size: 2rem;
  padding-bottom: 1rem;
`;

export const StyledHeadline3 = styled(Typography)`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

export const StyledH4 = styled(Typography)`
  font-size: 24px;
  line-height: 2.4;
`;

export const StyledBodyText = styled(Typography)`
  font-size: 1rem;
  line-height: 24px;
  color: #212529;
`;
export const StyledErrorMessage = styled(Typography)`
  color: #d32f2f;
`;

export const StyledUploadedFile = styled('div')`
  display: flex;
`;

export const StyledSpan = styled('span')`
  font-weight: bold;
`;
