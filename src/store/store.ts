import { configureStore } from '@reduxjs/toolkit';

import { articleSlice } from './article';
import { articleDetailSlice } from './articleDetail';
import { loginSlice } from './login';
import { settingsSlice } from './settings';
import { getLanguageFromLocalStorage } from '../utils/utils';

const persistedLanguage = getLanguageFromLocalStorage();

const store = configureStore({
  reducer: {
    articleList: articleSlice.reducer,
    articleDetail: articleDetailSlice.reducer,
    login: loginSlice.reducer,
    settings: settingsSlice.reducer
  },
  preloadedState: {
    settings: {
      language: persistedLanguage || 'en'
    }
  }
});

export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
