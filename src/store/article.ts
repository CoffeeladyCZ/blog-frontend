import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../model/Articles';

interface ArticleState {
  articles: Article[];
}

const initialState: ArticleState = {
  articles: []
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    }
  }
});

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;
