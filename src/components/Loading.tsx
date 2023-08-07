import React from 'react';
import { CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)`
  height: 100vh;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
const Loading: React.FC = () => {
  return (
    <StyledContainer>
      <CircularProgress className="progress" />
    </StyledContainer>
  );
};

export default Loading;
