import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MarkdownEditor from '@uiw/react-md-editor';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { StyledSmallText, StyledBox } from '../styled/styled';
import { styled } from '@mui/system';

import { getArticle } from '../utils/apiUtils';
import { ArticleDetailTypes, defaultArticleDetailValues } from '../model/Articles';

import Loading from '../components/Loading';

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

  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const article = await getArticle(id);
        if (article) {
          setArticleData(article);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <StyledBox>
      <StyledCard>
        <CardContent>
          <StyledH1 pb={2}>{articleData.title}</StyledH1>
          <StyledSmallText variant="body2">
            {author} • {dayjs(articleData.lastUpdatedAt).format('DD/MM/YY')}
          </StyledSmallText>
        </CardContent>
        {articleData.image && <StyledCardMedia image={articleData.image} />}
        <CardContent>
          <MarkdownEditor
            id="content"
            value={articleData.content}
            height={500}
            data-color-mode="light"
            preview="preview"
            hideToolbar={true}
            visibleDragbar={false}
          />
        </CardContent>
      </StyledCard>
    </StyledBox>
  );
};

export default ArticleDetail;
