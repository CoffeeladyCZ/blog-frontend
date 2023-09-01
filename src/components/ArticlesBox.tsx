import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { RootState } from '../store/store';
import { Article } from '../model/Articles';
import { StyledSmallText, StyledH4, StyledLink } from '../styled/styled';

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
      <StyledSmallText>{perex}</StyledSmallText>
    </StyledArticleBox>
  );
};

const RelatedArticlesBox: React.FC = () => {
  const listArticles: Article[] = useSelector((state: RootState) => state.article.listArticles);

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
