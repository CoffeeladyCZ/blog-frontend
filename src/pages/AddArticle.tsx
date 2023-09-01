import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { httpPost } from '../utils/axiosService';
import MarkdownEditor from '@uiw/react-md-editor';

import { Grid, Button, TextField, Tooltip } from '@mui/material';
import {
  StyledBox,
  StyledImageContainer,
  StyledArticleGrid,
  StyledH1,
  StyledButtonGrid,
  StyledIconImageButton,
  StyledImg
} from '../styled/styled';

import { Close } from '@mui/icons-material';

import { FormValuesTypes } from '../model/Articles';
import { useFileUpload } from '../hooks/useFileUpload';
import { fetchImage } from '../utils/apiUtils';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';

const AddArticle: React.FC = () => {
  const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const { uploadFile, deleteFile, cleanFileInput, uploadedFile, imageId } = useFileUpload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValuesTypes>({
    mode: 'onChange'
  });

  useEffect(() => {
    if (imageId) {
      const loadImage = async () => {
        try {
          const base64Image = await fetchImage(imageId);
          setImage(base64Image);
          setShowSuccessAlert(true);
        } catch (error) {
          console.error(error);
        }
      };
      loadImage();
    }
    setImage(null);
  }, [imageId]);

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
    await createArticle(data);
  };

  /** Creates article */
  const createArticle = async (data: FormValuesTypes) => {
    setIsLoading(true);
    try {
      await httpPost('/articles', data);
      setShowSuccessAlert(true);
      cleanFileInput();
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setContent('You can use markdown! Yeeey!');
      setIsLoading(false);
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
        <StyledArticleGrid container rowSpacing={4}>
          <Grid container justifyContent="space-between" spacing={0}>
            <Grid item xs={4}>
              <StyledH1 variant="h1">Create new article</StyledH1>
            </Grid>
            <StyledButtonGrid item xs={3}>
              <Button variant="contained" type="submit">
                Publish Article
              </Button>
            </StyledButtonGrid>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            {image && typeof image === 'string' && imageId && (
              <div>
                <p>Featured image:</p>
                <StyledImageContainer>
                  <StyledImg src={image} alt="Uploaded" />
                  <Tooltip title="Delete upload file">
                    <StyledIconImageButton
                      size="small"
                      color="primary"
                      onClick={() => deleteFile(imageId)}>
                      <Close />
                    </StyledIconImageButton>
                  </Tooltip>
                </StyledImageContainer>
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            {!uploadedFile && <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />}
          </Grid>
          <Grid item xs={12}>
            <MarkdownEditor
              id="content"
              value={content}
              height={500}
              data-color-mode="light"
              onChange={handleEditorChange}
            />
          </Grid>
        </StyledArticleGrid>
      </form>
    </StyledBox>
  );
};

export default AddArticle;
