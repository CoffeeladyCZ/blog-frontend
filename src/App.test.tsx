import { render } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n/config';

test('renders component', () => {
  render(
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  );
});
