import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Cookies from 'js-cookie';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

import { setLogin } from '../../store/login';

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

    expect(screen.getByTestId('navMyArticles')).toBeInTheDocument();
    expect(screen.getByTestId('navNewArticle')).toBeInTheDocument();
  });

  test('logoutUser correctly dispatches actions and updates state', () => {
    Cookies.remove = jest.fn();
    store.dispatch = jest.fn();

    render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MemoryRouter>
            <Navigation />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>
    );

    const menuButton = screen.getByTestId('menuButton');
    fireEvent.click(menuButton);
    const submitButton = screen.getByTestId('logout');
    act(() => {
      fireEvent.click(submitButton);
    });

    expect(store.dispatch).toHaveBeenCalledWith(setLogin(false));
    expect(Cookies.remove).toHaveBeenCalledWith('token');
  });
});
