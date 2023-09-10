import React from 'react';
import { CircularProgress } from '@mui/material';

import { StyledContainer } from '../styled/styled';

const Loading: React.FC = () => {
  return (
    <StyledContainer>
      <CircularProgress className="progress" data-testid="loading" />
    </StyledContainer>
  );
};

export default Loading;
