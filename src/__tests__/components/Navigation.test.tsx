import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

import Navigation from '../../components/Navigation';

describe('Navigation without login', () => {
  const initialState = {
    login: {
      login: false
    },
    settings: {
      language: 'en'
    }
  };
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  test('should snapshot with data', () => {
    const container = render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Navigation />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>
    );

    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render - without login', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Navigation />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>
    );

    expect(screen.getByTestId('navRecentArticles')).toBeInTheDocument();
  });
});

describe('Navigation with login', () => {
  const initialState = {
    login: {
      login: true
    },
    settings: {
      language: 'en'
    }
  };
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  test('should snapshot with data', () => {
    const container = render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Navigation />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>
    );

    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render - with login', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Navigation />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>
    );

    const myArticlesLinks = screen.getAllByTestId('navMyArticles');

    expect(myArticlesLinks.length).toBeGreaterThan(0);
    expect(myArticlesLinks[0]).toBeInTheDocument();
  });
});
