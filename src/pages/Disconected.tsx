import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/material';
import { styled } from '@mui/system';

import { StyledH1, StyledSmallLightText } from '../styled/styled';

const StyledContainer = styled(Container)`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
`;

const Disconnected: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledContainer data-testid="disconnected">
      <StyledH1 variant="h1">{t('disconnected.textTwo')}</StyledH1>
      <StyledSmallLightText>{t('disconnected.textTwo')}</StyledSmallLightText>
    </StyledContainer>
  );
};

export default Disconnected;
