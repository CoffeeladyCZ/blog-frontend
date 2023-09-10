import React from 'react';

import { Container } from '@mui/material';
import { styled } from '@mui/system';

import { StyledH1 } from '../styled/styled';

const StyledContainer = styled(Container)`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
`;

const NotFound: React.FC = () => {
  return (
    <StyledContainer data-testid="notFound">
      <StyledH1 variant="h1">Page not found.</StyledH1>;
    </StyledContainer>
  );
};

export default NotFound;
