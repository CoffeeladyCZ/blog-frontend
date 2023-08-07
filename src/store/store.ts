import { configureStore } from '@reduxjs/toolkit';
import ArticleReducer from './article';
import LoginReducer from './login';

const store = configureStore({
  reducer: {
    article: ArticleReducer,
    login: LoginReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
