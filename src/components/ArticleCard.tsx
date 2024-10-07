import React, { useLayoutEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledH4, StyledSmallLightText, StyledLink } from '../styled/styled';
import { getImageData } from '../utils/apiUtils';
import { ArticleType } from '../types/Articles';

import Loading from '../components/Loading';

type ArticleCardProps = {
  article: ArticleType;
};

const StyledCard = styled(Card)`
  display: flex;
  box-shadow: none;
  max-width: 860px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const getImage = async (imageId: string) => {
    setIsLoading(true);
    try {
      const imageResponse = await getImageData(imageId);
      setImage(imageResponse);
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
      <Grid container>
        <Grid item md={4}>
          {image && <CardMedia image={image} sx={{ width: 250, height: 250 }} component="img" />}
        </Grid>
        <Grid item md={8}>
          <StyledBox>
            <CardContent>
              <StyledLink to={`/article/${article.articleId}`}>
                <StyledH4 variant="h4">{article.title}</StyledH4>
              </StyledLink>
              <StyledSmallLightText variant="body2" pb={2}>
                {article.author} • {dayjs(article.createdAt).format('DD/MM/YY')}
              </StyledSmallLightText>
              <Typography variant="body1">{article.perex}</Typography>
            </CardContent>
            <CardActions>
              <Link to={`/article/${article.articleId}`}>
                <Button size="small">{t('readWholeArticle')}</Button>
              </Link>
            </CardActions>
          </StyledBox>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default ArticleCard;
