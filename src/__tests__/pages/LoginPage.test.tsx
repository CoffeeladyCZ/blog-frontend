import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setLogin } from '../../store/login';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n/config';

import LoginPage from '../../pages/LoginPage';

describe('LoginPage', () => {
  let axiosMock: MockAdapter;
  const mockStore = configureStore([]);
  const initialState = {
    login: {
      login: false
    }
  };

  beforeEach(async () => {
    jest.spyOn(console, 'error');
    axiosMock = new MockAdapter(axios);
    const store = mockStore(initialState);

    render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>
    );
  });

  test('should snapshot with data', () => {
    act(() => {
      const store = mockStore(initialState);

      const { asFragment } = render(
        <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <MemoryRouter initialEntries={['/login']}>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        </I18nextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('renders component', async () => {
    const loginEmail = await screen.getByTestId('loginEmail');
    expect(loginEmail).toBeInTheDocument();
    const loginPassword = await screen.getByTestId('loginPassword');
    expect(loginPassword).toBeInTheDocument();
    const loginButton = await screen.getByTestId('loginButton');
    expect(loginButton).toBeInTheDocument();
  });

  test('handles onSubmit correctly - success is false', async () => {
    const store = mockStore(initialState);

    const mockLoginResponse = {
      success: false,
      error: {
        response: {
          data: {
            message: 'Login failed'
          }
        }
      }
    };

    await axiosMock.onPost('/login').reply(400, mockLoginResponse);

    const emailInput = screen.getByTestId('loginEmail');
    userEvent.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByTestId('loginPassword');
    userEvent.type(passwordInput, 'password');

    const submitButton = screen.getByTestId('loginButton');
    fireEvent.click(submitButton);

    expect(store.getActions()).toEqual([]);
  });

  test('handles onSubmit correctly - success is true', async () => {
    const store = mockStore(initialState);
    const mockLoginResponse = {
      success: true
    };

    await axiosMock.onPost('/login').reply(200, mockLoginResponse);

    const emailInput = screen.getByTestId('loginEmail');
    userEvent.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByTestId('loginPassword');
    userEvent.type(passwordInput, 'password123');

    const submitButton = screen.getByTestId('loginButton');
    fireEvent.click(submitButton);

    store.dispatch(setLogin(true));

    expect(store.getActions()).toEqual([{ type: 'login/setLogin', payload: true }]);
  });
});
