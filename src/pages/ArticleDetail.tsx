import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MarkdownEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Container, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { StyledSmallLightText } from '../styled/styled';
import { styled } from '@mui/system';

import { setArticleDetail } from '../store/articleDetail';
import { RootState } from '../store/store';
import { useArticle } from '../hooks/useArticle';

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
  word-wrap: 'break-word';
`;

const ArticleDetail: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const articleDetail = useSelector((state: RootState) => state.articleDetail.articleDetail);
  const { id } = useParams();
  const { getArticleDetail } = useArticle();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const article = await getArticleDetail(id);
      if (article) {
        dispatch(setArticleDetail(article));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchData();
    return () => {
      setIsLoading(false);
    };
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    articleDetail &&
    !isLoading && (
      <StyledDetailContainer data-testid="articleDetail">
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <StyledH1 pb={2}>{articleDetail.title}</StyledH1>
                <StyledSmallLightText variant="body2">
                  {articleDetail.author} • {dayjs(articleDetail.last_updated_at).format('DD/MM/YY')}
                </StyledSmallLightText>
              </CardContent>
              <CardContent>{articleDetail.perex}</CardContent>
              {articleDetail.image && <StyledCardMedia image={articleDetail.image} />}
              <CardContent>
                <MarkdownEditor
                  id="content"
                  value={articleDetail.content}
                  data-color-mode="light"
                  preview="preview"
                  hideToolbar={true}
                  visibleDragbar={false}
                  height={700}
                />
              </CardContent>
              <CommentsBox comments={articleDetail.comments} articleId={articleDetail.article_id} />
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <RelatedArticlesBox />
          </Grid>
        </Grid>
      </StyledDetailContainer>
    )
  );
};

export default ArticleDetail;
