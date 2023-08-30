import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Box, Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { blobToBase64 } from '../utils/utils';
import { httpGetImage } from '../utils/axiosService';
import { StyledH4 } from '../styled/styled';

import { Article } from '../model/Articles';

type ArticleCardProps = {
  article: Article;
};

const StyledCard = styled(Card)`
  display: flex;
  box-shadow: none;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 250px;
  width: 250px;
`;

const StyledSmallText = styled(Typography)`
  color: rgba(108, 117, 125, 1);
  line-height: 20px;
`;

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [image, setImage] = useState<string | null>(null);

  const author = 'Marcela Karafizievová';

  const getImage = async (imageId: string) => {
    try {
      const imageResponse = await httpGetImage(`/images/${imageId}`, {
        responseType: 'blob'
      });
      const imageBlob = new Blob([imageResponse.data]);
      const base64Image = await blobToBase64(imageBlob);
      setImage(base64Image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (article.imageId) {
      getImage(article.imageId);
    }
    setImage(null);
  }, [article]);

  return (
    <StyledCard>
      {image && <StyledCardMedia image={image}></StyledCardMedia>}
      <StyledBox>
        <CardContent>
          <StyledH4 variant="h4">{article.title}</StyledH4>
          <StyledSmallText variant="body2" pb={2}>
            {author} • {dayjs(article.lastUpdatedAt).format('DD/MM/YYYY')}
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
