import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyledBox, StyledGrid, StyledHeadline1 } from '../styled/styled';
import { httpGet } from '../utils/axiosService';
import { setArticles } from '../store/article';
import { RootState } from '../store/store';

import { Grid } from '@mui/material';

import ArticleCard from '../components/ArticleCard';

const RecentArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.article.articles);

  /** Get articles from API */
  const getArticles = async () => {
    setIsLoading(true);

    try {
      const response = await httpGet('/articles');
      const data = await response.data.items;
      dispatch(setArticles(data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <StyledBox>
      <StyledGrid container rowSpacing={4}>
        <Grid item xs={12}>
          <StyledHeadline1 variant="h1">Recent articles</StyledHeadline1>
        </Grid>
        {!isLoading &&
          articles &&
          articles.map((article) => {
            return (
              <Grid item xs={12} key={article.articleId}>
                <ArticleCard article={article} />
              </Grid>
            );
          })}
      </StyledGrid>
    </StyledBox>
  );
};

export default RecentArticles;
