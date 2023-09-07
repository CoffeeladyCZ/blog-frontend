import { configureStore } from '@reduxjs/toolkit';
import { articleSlice } from './article';
import { articleDetailSlice } from './articleDetail';
import { loginSlice } from './login';

const store = configureStore({
  reducer: {
    articleList: articleSlice.reducer,
    articleDetail: articleDetailSlice.reducer,
    login: loginSlice.reducer
  }
});

export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
