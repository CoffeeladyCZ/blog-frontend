import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MarkdownEditor from '@uiw/react-md-editor';

import { Card, Container, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { StyledSmallLightText } from '../styled/styled';
import { styled } from '@mui/system';

import { getDetailArticle } from '../utils/apiUtils';
import { ArticleDetailTypes, defaultArticleDetailValues } from '../types/Articles';

import Loading from '../components/Loading';
import RelatedArticlesBox from '../components/ArticlesBox';
import CommentsBox from '../components/CommentsBox';

const StyledDetailContainer = styled(Container)`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  box-shadow: none;
  flex-direction: column;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 504px;
  width: 760px;
  margin: 16px;
`;

const StyledH1 = styled(Typography)`
  font-size: 40px;
`;

const ArticleDetail: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<ArticleDetailTypes>(defaultArticleDetailValues);

  const author = 'Marcela Karafizievová';
  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const article = await getDetailArticle(id);
      if (article) {
        setArticleData(article);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <StyledDetailContainer>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <StyledH1 pb={2}>{articleData.title}</StyledH1>
              <StyledSmallLightText variant="body2">
                {author} • {dayjs(articleData.lastUpdatedAt).format('DD/MM/YY')}
              </StyledSmallLightText>
            </CardContent>
            {articleData.image && <StyledCardMedia image={articleData.image} />}
            <CardContent>
              <MarkdownEditor
                id="content"
                value={articleData.content}
                data-color-mode="light"
                preview="preview"
                hideToolbar={true}
                visibleDragbar={false}
                enableScroll={true}
                height={800}
              />
            </CardContent>
          </StyledCard>
          <CommentsBox comments={articleData.comments} />
        </Grid>
        <Grid item xs={12} md={4}>
          <RelatedArticlesBox />
        </Grid>
      </Grid>
    </StyledDetailContainer>
  );
};

export default ArticleDetail;
