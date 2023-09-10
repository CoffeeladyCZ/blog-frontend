import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleDetailTypes } from '../types/Articles';

interface ArticleState {
  articleList: Article[];
}

const initialState: ArticleState = {
  articleList: []
};

export const articleSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    setArticleList: (state, action: PayloadAction<Article[]>) => {
      state.articleList = action.payload;
    }
  }
});

export const { setArticleList } = articleSlice.actions;

export const articleReducer = articleSlice.reducer;
