import { ArticleDetailTypes } from './../types/Articles';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArticleDetailState {
  articleDetail: ArticleDetailTypes | null;
}

const initialArticleDetailState: ArticleDetailState = {
  articleDetail: null
};

export const articleDetailSlice = createSlice({
  name: 'articleDetail',
  initialState: initialArticleDetailState,
  reducers: {
    setArticleDetail: (state, action: PayloadAction<ArticleDetailTypes | null>) => {
      state.articleDetail = action.payload;
    }
  }
});

export const { setArticleDetail } = articleDetailSlice.actions;

export const articleDetailReducer = articleDetailSlice.reducer;
