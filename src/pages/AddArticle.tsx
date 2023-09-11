import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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

import { FormDetailType } from '../types/Articles';
import { useFileUpload } from '../hooks/useFileUpload';
import { getImageData, createArticleData } from '../utils/apiUtils';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';
import MarkdownControlled from '../components/MarkDownControlled';

const AddArticle: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const { uploadFile, deleteFile, cleanFileInput, uploadedFile, imageId } = useFileUpload();
  const navigate = useNavigate();

  const methods = useForm<FormDetailType>({
    mode: 'onChange'
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = methods;

  useEffect(() => {
    if (imageId) {
      const loadImage = async () => {
        try {
          const base64Image = await getImageData(imageId);
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

  const onSubmit = async (data: FormDetailType) => {
    data.imageId = imageId;
    await createArticle(data);
  };

  const createArticle = async (data: FormDetailType) => {
    setIsLoading(true);
    try {
      await createArticleData(data);
      setShowSuccessAlert(true);
      cleanFileInput();
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      navigate('/articles');
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledArticleGrid container rowSpacing={4}>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item xs={4}>
                <StyledH1 variant="h1">Create new article</StyledH1>
              </Grid>
              <StyledButtonGrid item xs={3}>
                <Button variant="contained" type="submit" data-testid="addArticleButton">
                  Publish Article
                </Button>
              </StyledButtonGrid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <TextField
                      label="Title"
                      error={Boolean(errors.title)}
                      helperText={errors.title ? 'Item is required' : ''}
                      id="title"
                      placeholder="My First Article"
                      size="small"
                      fullWidth
                      {...field}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="perex"
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <TextField
                      label="Perex"
                      error={Boolean(errors.perex)}
                      helperText={errors.perex ? 'Item is required' : ''}
                      id="perex"
                      size="small"
                      fullWidth
                      {...field}
                    />
                  );
                }}
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
              {!uploadedFile && (
                <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />
              )}
            </Grid>
            <Grid item xs={12}>
              <MarkdownControlled />
            </Grid>
          </StyledArticleGrid>
        </form>
      </FormProvider>
    </StyledBox>
  );
};

export default AddArticle;
