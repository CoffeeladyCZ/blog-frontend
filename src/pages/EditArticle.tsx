import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import MarkdownEditor from '@uiw/react-md-editor';

import { CircularProgress, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledBox, StyledHeadline1 } from '../styled/styled';
import { FormValuesTypes } from '../model/Articles';

import LoginPage from './LoginPage';

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
  } = useForm<FormValuesTypes>({
    mode: 'onChange'
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`; //zůstane do refreshe stránky

  const onSubmit = async (data: FormValuesTypes) => {
    console.log('submit', data);
    await updateArticle(data);
  };

  const updateArticle = async (data: FormValuesTypes) => {
    setIsLoading(true);
    const apiURL = 'https://fullstack.exercise.applifting.cz/articles';
    const config = {
      headers: {
        'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7',
        Autorization: `Bearer ${Cookies.get('token')}`
      }
    };

    try {
      const response = axios.patch(apiURL, data, config);
      console.log('token new article', response);
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
            <StyledHeadline1 variant="h1">Edit article</StyledHeadline1>
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
