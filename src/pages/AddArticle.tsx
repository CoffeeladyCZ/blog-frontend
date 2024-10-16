import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

import { FormDetailType, ImageType } from '../types/Articles';
import { useFileUpload } from '../hooks/useFileUpload';
import { useArticle } from '../hooks/useArticle';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';
import MarkdownControlled from '../components/MarkDownControlled';

const AddArticle: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [image, setImage] = useState<ImageType | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const { uploadFile, cleanFileInput } = useFileUpload();
  const { createArticleData } = useArticle();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const methods = useForm<FormDetailType>({
    mode: 'onChange'
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
    watch
  } = methods;

  // get data from localStorage after refresh if exists
  useEffect(() => {
    const data = localStorage.getItem('image');
    const savedImage = data ? JSON.parse(data) : null;
    if (savedImage) {
      setImage(savedImage);
    }
    const savedArticle = localStorage.getItem('articleDraft');
    if (savedArticle) {
      const parsedData = JSON.parse(savedArticle);
      setValue('title', parsedData.title || '');
      setValue('perex', parsedData.perex || '');
      setValue('content', parsedData.content || '');
    }

    const userData = localStorage.getItem('sb-mmoccjwzmjbtmiotkzai-auth-token');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user.user.email);
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('image');
    const savedImage = data ? JSON.parse(data) : null;
    if (savedImage) {
      setImage(savedImage);
    }
  }, [uploadFile]);

  const watchedFields = watch();

  useEffect(() => {
    if (Object.keys(watchedFields).length > 0) {
      localStorage.setItem('articleDraft', JSON.stringify(watchedFields));
    }
  }, [watchedFields]);

  const onSubmit = async (data: FormDetailType) => {
    setIsLoading(true);
    if (image) {
      const updatedArticleData = { ...data, image_id: image.imageId, author: user };

      try {
        await createArticleData(updatedArticleData, image);
        setShowSuccessAlert(true);
        cleanFileInput();
        reset();
        localStorage.removeItem('articleDraft');
        localStorage.removeItem('image');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        navigate('/articles');
      }
    }
  };

  const deleteImage = async () => {
    setImage(null);
    localStorage.removeItem('image');
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
              <Grid item xs={12}>
                <StyledH1 variant="h1">{t('newArticle')}</StyledH1>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="title"
                defaultValue={''}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <TextField
                      label="Title"
                      error={Boolean(errors.title)}
                      helperText={errors.title ? t('errorMessage.item') : ''}
                      id="title"
                      placeholder={t('firstArticle')}
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
                      label={t('table.perex')}
                      error={Boolean(errors.perex)}
                      helperText={errors.perex ? t('errorMessage.item') : ''}
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
              {image && (
                <div>
                  <p>{t('featuredImage')}:</p>
                  <StyledImageContainer>
                    <StyledImg src={image.imageUrl} alt="Uploaded" />
                    <Tooltip title={t('tooltip.deleteFile')}>
                      <StyledIconImageButton size="small" color="primary" onClick={deleteImage}>
                        <Close />
                      </StyledIconImageButton>
                    </Tooltip>
                  </StyledImageContainer>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              {!image && <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />}
            </Grid>
            <Grid item xs={12}>
              <MarkdownControlled />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="end" spacing={0}>
                <StyledButtonGrid item xs={3}>
                  <Button variant="outlined" type="button" data-testid="cancelArticleButton">
                    {t('cancel')}
                  </Button>
                </StyledButtonGrid>
                <StyledButtonGrid item xs={3}>
                  <Button variant="contained" type="submit" data-testid="addArticleButton">
                    {t('publishArticle')}
                  </Button>
                </StyledButtonGrid>
              </Grid>
            </Grid>
          </StyledArticleGrid>
        </form>
      </FormProvider>
    </StyledBox>
  );
};

export default AddArticle;
