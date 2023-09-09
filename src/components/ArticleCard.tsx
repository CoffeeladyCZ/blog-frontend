import React, { useLayoutEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Box, Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledH4, StyledSmallText } from '../styled/styled';
import { getImageData } from '../utils/apiUtils';

import { Article } from '../types/Articles';
import Loading from '../components/Loading';

type ArticleCardProps = {
  article: Article;
};

const StyledCard = styled(Card)`
  display: flex;
  box-shadow: none;
  max-width: 860px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const author = 'Marcela Karafizievová';

  const getImage = async (imageId: string) => {
    setIsLoading(true);
    try {
      const base64Image = await getImageData(imageId);
      setImage(base64Image);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (article.imageId) {
      getImage(article.imageId);
    }
    setImage(null);
  }, [article]);

  if (isLoading) return <Loading />;

  return (
    <StyledCard>
      {image && <CardMedia image={image} sx={{ width: 250, height: 250 }} component="img" />}
      <StyledBox>
        <CardContent>
          <StyledH4 variant="h4">{article.title}</StyledH4>
          <StyledSmallText variant="body2" pb={2}>
            {author} • {dayjs(article.createdAt).format('DD/MM/YY')}
          </StyledSmallText>
          <Typography variant="body1">{article.perex}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/article/${article.articleId}`}>
            <Button size="small">Read whole article</Button>
          </Link>
        </CardActions>
      </StyledBox>
    </StyledCard>
  );
};

export default ArticleCard;
