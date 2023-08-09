import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import axios from 'axios';
import MarkdownEditor from '@uiw/react-md-editor';

import { styled } from '@mui/material/styles';
import { Grid, Button, TextField } from '@mui/material';
import { StyledBox, StyledHeadline1 } from '../styled/styled';

import { FormValuesTypes } from '../model/Articles';
import LoginPage from './LoginPage';
import Loading from '../components/Loading';

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
  } = useForm<FormValuesTypes>({
    mode: 'onChange'
  });

  /** Changes actual content */
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setContent(value);
    }
  };

  const onSubmit = async (data: FormValuesTypes) => {
    setIsLoading(true);
    data.content = content; // Sets content from markdown
    await createArticle(data);
    setIsLoading(false);
  };

  const createArticle = async (data: FormValuesTypes) => {
    const config = {
      headers: {
        'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7',
        Autorization: `Bearer ${Cookies.get('token')}`
      }
    };

    try {
      await axios.post('https://fullstack.exercise.applifting.cz/articles', data, config);
    } catch (error) {
      console.error(error);
    }
  };

  if (!Cookies.get('token')) return <LoginPage />;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledGrid container rowSpacing={3}>
          <Grid item xs={4}>
            <StyledHeadline1 variant="h1">Create new article</StyledHeadline1>
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
