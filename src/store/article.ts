import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../types/Articles';

interface ArticleState {
  listArticles: Article[];
}

const initialState: ArticleState = {
  listArticles: []
};

export const articleSlice = createSlice({
  name: 'listArticles',
  initialState,
  reducers: {
    setListArticles: (state, action: PayloadAction<Article[]>) => {
      state.listArticles = action.payload;
    }
  }
});

export const { setListArticles } = articleSlice.actions;
export default articleSlice.reducer;
