import React from 'react';

import { Container } from '@mui/material';
import { styled } from '@mui/system';

import { StyledH1, StyledSmallLightText } from '../styled/styled';

const StyledContainer = styled(Container)`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
`;

const Disconnected: React.FC = () => {
  return (
    <StyledContainer data-testid="disconnected">
      <StyledH1 variant="h1">You got disconnected after 1 hour.</StyledH1>
      <StyledSmallLightText>To continue, you must log in again.</StyledSmallLightText>
    </StyledContainer>
  );
};

export default Disconnected;
