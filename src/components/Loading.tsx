import React from 'react';
import { CircularProgress } from '@mui/material';

import { StyledContainer } from '../styled/styled';

const Loading: React.FC = () => {
  return (
    <StyledContainer>
      <CircularProgress className="progress" />
    </StyledContainer>
  );
};

export default Loading;
