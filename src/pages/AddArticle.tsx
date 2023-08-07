import React, { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import axios from 'axios';

import { CircularProgress, Grid, Button, Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MarkdownEditor from '@uiw/react-md-editor';

import LoginPage from './LoginPage';
import { Article } from '../model/Articles';

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

const AddArticle: React.FC = () => {
  const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange'
  });

  const handleEditorChange = (value: string | undefined) => {
    if (value) setContent(value);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    data.content = content; // Sets content from markdown
    await createArticle(data);
    setIsLoading(false);
  };

  const createArticle = async (data: FormValues) => {
    const config = {
      headers: {
        'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
      }
    };

    try {
      console.log('token new article', Cookies.get('token'));
      await axios.post('/articles', data, config);
    } catch (error) {
      console.error(error);
    }
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
            <StyledTypography variant="h1">Create new article</StyledTypography>
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
            <MarkdownEditor
              id="content"
              value={content}
              height={500}
              data-color-mode="light"
              onChange={handleEditorChange}
            />
          </Grid>
        </StyledGrid>
      </form>
    </StyledBox>
  );
};

export default AddArticle;
