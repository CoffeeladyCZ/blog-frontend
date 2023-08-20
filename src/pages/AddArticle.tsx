import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { httpPost } from '../utils/axiosService';
import MarkdownEditor from '@uiw/react-md-editor';

import { styled } from '@mui/material/styles';
import { Grid, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { StyledBox, StyledHeadline1, StyledUploadedFile, StyledSpan } from '../styled/styled';
import { Close } from '@mui/icons-material';

import { FormValuesTypes } from '../model/Articles';
import { useFileUpload } from '../hooks/useFileUpload';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';

const StyledGrid = styled(Grid)`
  max-width: 1152px;
`;

const AddArticle: React.FC = () => {
  const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const { uploadFile, deleteFile, cleanFileInput, uploadedFile, imageId } = useFileUpload();

  const {
    register,
    handleSubmit,
    reset,
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
    data.content = content;
    data.imageId = imageId;
    console.log('data', data);
    await createArticle(data);
    setIsLoading(false);
  };

  /** Creates article */
  const createArticle = async (data: FormValuesTypes) => {
    try {
      await httpPost('/articles', data);
      setShowSuccessAlert(true);
      cleanFileInput();
      setContent('You can use markdown! Yeeey!');
      reset();
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
      {showSuccessAlert && (
        <Notification
          severity="success"
          message="Success"
          open={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledGrid container rowSpacing={4}>
          <Grid item xs={4}>
            <StyledHeadline1 variant="h1">Create new article</StyledHeadline1>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" type="submit">
              Publish Article
            </Button>
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
            <TextField
              label="Perex"
              {...register('perex', {
                required: 'Error'
              })}
              error={Boolean(errors.perex)}
              helperText={errors.perex?.message}
              id="title"
              placeholder="Perex"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            {!uploadedFile && <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />}
            {uploadedFile && (
              <StyledUploadedFile>
                <p>
                  <StyledSpan>Uploaded file: </StyledSpan>
                  {uploadedFile.name}
                </p>
                <Tooltip title="Delete upload file">
                  <IconButton color="primary" onClick={deleteFile}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </StyledUploadedFile>
            )}
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
