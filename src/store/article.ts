import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleType } from '../types/Articles';

interface ArticleState {
  articleList: ArticleType[];
}

const initialState: ArticleState = {
  articleList: []
};

export const articleSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    setArticleList: (state, action: PayloadAction<ArticleType[]>) => {
      state.articleList = action.payload;
    }
  }
});

export const { setArticleList } = articleSlice.actions;

export const articleReducer = articleSlice.reducer;
