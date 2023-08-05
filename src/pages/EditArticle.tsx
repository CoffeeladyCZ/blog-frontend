import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { CircularProgress, Grid, Button, Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MarkdownEditor from '@uiw/react-md-editor';

import LoginPage from './LoginPage';

type FormValues = {
  title: string;
  image: string;
  content: string;
};

const StyledTypography = styled(Typography)`
  font-size: 32px;
`;

const StyledBox = styled(Box)`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StyledGrid = styled(Grid)`
  max-width: 1152px;
`;

const EditArticle: React.FC = () => {
  const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange'
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`; //zůstane do refreshe stránky

  const onSubmit = async (data: FormValues) => {
    console.log('submit', data);
    await updateArticle(data);
  };

  const updateArticle = async (data: FormValues) => {
    setIsLoading(true);
    const apiURL = 'https://fullstack.exercise.applifting.cz/articles';
    const config = {
      headers: {
        'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
      }
    };

    try {
      console.log('token new article', Cookies.get('token'));
      // await axios.patch(apiURL, data, config);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  if (!Cookies.get('token')) return <LoginPage />;

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <StyledBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledGrid container rowSpacing={3}>
          <Grid item xs={4}>
            <StyledTypography variant="h1">Edit article</StyledTypography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained">Publish Article</Button>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Article title"
              {...register('title', {
                required: 'Error'
              })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              id="title"
              placeholder="My First Article"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <MarkdownEditor id="content" value={content} height={500} data-color-mode="light" />
          </Grid>
        </StyledGrid>
      </form>
    </StyledBox>
  );
};

export default EditArticle;
