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

import { FormDetailType, defaultArticleValues } from '../types/Articles';
import { useFileUpload } from '../hooks/useFileUpload';
// import useSupabase from '../hooks/useSupabase';
import { useArticle } from '../hooks/useArticle';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';
import MarkdownControlled from '../components/MarkDownControlled';

const AddArticle: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [articleData, setArticleData] = useState<FormDetailType>(defaultArticleValues);
  const [user, setUser] = useState<string | null>(null);

  const { uploadFile, deleteFile, fileUrl, cleanFileInput, uploadedFile, imageId } =
    useFileUpload();
  const { createArticleData } = useArticle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const supabase = useSupabase();

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

  // useEffect(() => {
  //   if (imageId) {
  //     const loadImage = async () => {
  //       try {
  //         const base64Image = await getImageData(imageId);
  //         setImage(base64Image);
  //         setShowSuccessAlert(true);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     loadImage();
  //   }
  //   setImage(null);
  // }, [imageId]);

  // get data from localStorage after refresh if exists
  useEffect(() => {
    const data = localStorage.getItem('image');
    const savedImage = data ? JSON.parse(data) : null;
    if (savedImage) {
      setImage(savedImage.fileUrl);
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

  const watchedFields = watch();

  useEffect(() => {
    localStorage.setItem('articleDraft', JSON.stringify(watchedFields));
  }, [watchedFields]);

  const onSubmit = async (data: FormDetailType) => {
    setIsLoading(true);
    const updatedArticleData = { ...data, image_id: imageId, author: user };
    try {
      await createArticleData(updatedArticleData);
      setShowSuccessAlert(true);
      cleanFileInput();
      reset();
      localStorage.removeItem('articleDraft');
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
                <StyledH1 variant="h1">{t('newArticle')}</StyledH1>
              </Grid>
              <StyledButtonGrid item xs={3}>
                <Button variant="contained" type="submit" data-testid="addArticleButton">
                  {t('publishArticle')}
                </Button>
              </StyledButtonGrid>
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
              {articleData.image && fileUrl && imageId && (
                <div>
                  <p>{t('featuredImage')}:</p>
                  <StyledImageContainer>
                    <StyledImg src={fileUrl} alt="Uploaded" />
                    <Tooltip title={t('tooltip.deleteFile')}>
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
