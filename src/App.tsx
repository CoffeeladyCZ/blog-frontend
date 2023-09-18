import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes';
import store from './store/store';
import { Provider } from 'react-redux';
import './i18n/config';

import './App.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
