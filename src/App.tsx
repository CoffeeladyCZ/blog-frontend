import { useState, FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes';
import store from './store/store';
import { Provider } from 'react-redux';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import './i18n/config';

import Navigation from './components/Navigation';

import './App.scss';

interface ImportMetaEnv {
  readonly VITE_APP_SUPABASE_URL: string;
  readonly VITE_APP_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANNON_KEY);

const App: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {!session ? (
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            ) : (
              <>
                <Navigation />
                <Router />
              </>
            )}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
