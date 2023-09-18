import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

import NotFound from '../../pages/NotFound';

describe('NotFound', () => {
  jest.mock('react-i18next', () => ({
    useTranslation: jest.fn()
  }));

  test('should snapshot with data', () => {
    const container = render(
      <I18nextProvider i18n={i18next}>
        <NotFound />
      </I18nextProvider>
    );
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <NotFound />
      </I18nextProvider>
    );
    const notFoundElement = await screen.getByTestId('notFound');

    expect(notFoundElement).toBeInTheDocument();
  });
});
