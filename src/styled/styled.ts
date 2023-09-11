import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)`
  height: 100vh;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const StyledGrid = styled(Grid)`
  max-width: 1152px;
  padding: 0 24px 24px 24px;
`;

export const StyledArticleGrid = styled(Grid)`
  max-width: 760px;
`;

export const StyledButtonGrid = styled(Grid)`
  text-align: end;
`;

export const StyledBox = styled(Box)`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  padding: 0 24px;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgba(33, 37, 41, 1);

  &.active {
    color: #4dabf5;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(33, 37, 41, 1);

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledH1 = styled(Typography)`
  font-size: 2rem;
  padding-bottom: 1rem;
`;

export const StyledH3 = styled(Typography)`
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
`;

export const StyledBodyBoldText = styled(Typography)`
  font-size: 1rem;
  line-height: 24px;
  font-weight: 700;
`;

export const StyledBodyTextXL = styled(Typography)`
  font-size: 20px;
  line-height: 34px;
`;

export const StyledSmallLightText = styled(Typography)`
  color: rgba(108, 117, 125, 1);
  font-size: 14px;
  line-height: 20px;
`;

export const StyledSmallText = styled(Typography)`
  color: rgba(33, 37, 41, 1);
  font-size: 16px;
  line-height: 24px;
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

export const StyledImageContainer = styled('div')`
  position: relative;
  display: inline-block;
`;

export const StyledIconImageButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const StyledImg = styled('img')`
  width: 200px;
  height: auto;
`;
