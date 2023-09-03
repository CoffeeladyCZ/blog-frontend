import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyledBox, StyledGrid, StyledH1 } from '../styled/styled';
import { RootState } from '../store/store';
import { setListArticles } from '../store/article';
import { getListArticles } from '../utils/apiUtils';

import { Grid } from '@mui/material';

import ArticleCard from '../components/ArticleCard';

const RecentArticles: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.article.listArticles);

  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const fetchListArticles = async () => {
    setIsLoading(true);
    try {
      const data = await getListArticles();
      if (data) {
        return dispatch(setListArticles(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListArticles();
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
