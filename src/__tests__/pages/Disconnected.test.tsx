import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

import Disconnected from '../../pages/Disconected';

describe('Disconnected', () => {
  jest.mock('react-i18next', () => ({
    useTranslation: jest.fn()
  }));

  test('should snapshot with data', () => {
    const container = render(
      <I18nextProvider i18n={i18next}>
        <Disconnected />
      </I18nextProvider>
    );
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Disconnected />
      </I18nextProvider>
    );
    const disconnectedElement = await screen.getByTestId('disconnected');

    expect(disconnectedElement).toBeInTheDocument();
  });
});
