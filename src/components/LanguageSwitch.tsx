import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Language } from '@mui/icons-material';

import { setLanguage } from '../store/settings';
import { saveLanguageToLocalStorage } from '../utils/utils';
import { RootState } from '../store/store';
import { StyledNavButton } from '../styled/styled';

const LanguageSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.settings.language);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage(language));
    saveLanguageToLocalStorage(language);
    i18n.changeLanguage(language);
  };

  return (
    <div>
      {currentLanguage === 'cz' ? (
        <StyledNavButton startIcon={<Language />} onClick={() => handleLanguageChange('en')}>
          {t('language.english')}
        </StyledNavButton>
      ) : (
        <StyledNavButton startIcon={<Language />} onClick={() => handleLanguageChange('cz')}>
          {t('language.czech')}
        </StyledNavButton>
      )}
    </div>
  );
};

export default LanguageSwitch;
