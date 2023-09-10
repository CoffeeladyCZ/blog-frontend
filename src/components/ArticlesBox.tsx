import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { RootState } from '../store/store';
import { setListArticles } from '../store/article';
import { Article } from '../types/Articles';
import { StyledSmallLightText, StyledH4, StyledLink } from '../styled/styled';
import { getListArticles } from '../utils/apiUtils';

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
  const listArticles: Article[] = useSelector((state: RootState) => state.article.listArticles);

  useEffect(() => {
    checkListArticles();
  });

  const checkListArticles = async () => {
    if (listArticles.length === 0) {
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
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledBox>
      <StyledH4>Related articles</StyledH4>
      {listArticles.map((item: Article) => (
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
