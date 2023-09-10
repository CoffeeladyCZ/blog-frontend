import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid } from '@mui/material';

import { StyledBox, StyledGrid, StyledH1 } from '../styled/styled';
import { RootState } from '../store/store';
import { setArticleList } from '../store/article';
import { getArticleList } from '../utils/apiUtils';

import ArticleCard from '../components/ArticleCard';

const RecentArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articleList.articleList);

  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const fetchArticleList = async () => {
    setIsLoading(true);
    try {
      const data = await getArticleList();
      if (data) {
        return dispatch(setArticleList(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleList();
  }, []);

  return (
    <StyledBox>
      <StyledGrid container rowSpacing={4}>
        <Grid item xs={12}>
          <StyledH1 variant="h1">Recent articles</StyledH1>
        </Grid>
        {!isLoading &&
          sortedArticles &&
          sortedArticles.map((article) => {
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
