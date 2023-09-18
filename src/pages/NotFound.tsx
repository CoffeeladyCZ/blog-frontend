import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/material';
import { styled } from '@mui/system';

import { StyledH1 } from '../styled/styled';

const StyledContainer = styled(Container)`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
`;

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledContainer data-testid="notFound">
      <StyledH1 variant="h1">{t('pageNotFound')}</StyledH1>
    </StyledContainer>
  );
};

export default NotFound;
