import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { RootState } from '../store/store';
import { setArticleList } from '../store/article';
import { ArticleType } from '../types/Articles';
import { StyledSmallLightText, StyledH4, StyledLink } from '../styled/styled';
import { getArticleList } from '../utils/apiUtils';

import Loading from '../components/Loading';

type ArticlePropsType = {
  title: string;
  perex: string;
  articleId: string;
};

const StyledBox = styled(Box)`
  border-left: 1px solid rgba(223, 223, 223, 1);
  padding-left: 25px;
  margin: 16px;
`;

const StyledArticleBox = styled(Box)`
  margin-bottom: 24px;
`;

const ArticleBox: React.FC<ArticlePropsType> = ({ title, perex, articleId }) => {
  return (
    <StyledArticleBox>
      <StyledLink to={`/article/${articleId}`}>
        <Typography variant="h6">{title}</Typography>
      </StyledLink>
      <StyledSmallLightText>{perex}</StyledSmallLightText>
    </StyledArticleBox>
  );
};

const RelatedArticlesBox: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articleList: ArticleType[] = useSelector(
    (state: RootState) => state.articleList.articleList
  );

  useEffect(() => {
    checkArticleList();
  }, []);

  const checkArticleList = async () => {
    if (articleList.length === 0) {
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
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledBox data-testid="articleRelatedBox">
      <StyledH4>Related articles</StyledH4>
      {articleList &&
        articleList.map((item: ArticleType) => (
          <ArticleBox
            key={item.articleId}
            title={item.title}
            perex={item.perex}
            articleId={item.articleId}
          />
        ))}
    </StyledBox>
  );
};

export default RelatedArticlesBox;
