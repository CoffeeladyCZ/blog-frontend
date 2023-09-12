import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Cookies from 'js-cookie';

import { setLogin } from '../../store/login';

import Navigation from '../../components/Navigation';

describe('Navigation without login', () => {
  const initialState = {
    login: {
      login: false
    }
  };
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  test('should snapshot with data', () => {
    const container = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render - without login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Recent Articles')).toBeInTheDocument();
  });
});

describe('Navigation with login', () => {
  const initialState = {
    login: {
      login: true
    }
  };
  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  test('should snapshot with data', () => {
    const container = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render - with login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Navigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('My Articles')).toBeInTheDocument();
    expect(screen.getByText('New Article')).toBeInTheDocument();
  });

  test('logoutUser correctly dispatches actions and updates state', () => {
    Cookies.remove = jest.fn();
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </Provider>
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
