import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';

import { Grid, Button, TextField, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

import {
  StyledBox,
  StyledImageContainer,
  StyledArticleGrid,
  StyledH1,
  StyledButtonGrid,
  StyledIconImageButton,
  StyledImg
} from '../styled/styled';
import { FormValuesTypes, defaultArticleValues } from '../model/Articles';
import { useFileUpload } from '../hooks/useFileUpload';
import { fetchImage, getDetailArticle, updateArticleData } from '../utils/apiUtils';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';
import MarkdownControlled from '../components/MarkDownControlled';

const EditArticle: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<FormValuesTypes>(defaultArticleValues);

  const { id = '' } = useParams<{ id: string }>();
  const { uploadFile, deleteFile, imageId } = useFileUpload();
  const navigate = useNavigate();

  const methods = useForm<FormValuesTypes>({
    mode: 'onChange'
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = methods;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const article = await getDetailArticle(id);
        if (article) {
          setArticleData(article);
          setValue('title', article.title);
          setValue('perex', article.perex);
          setValue('content', article.content);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (imageId) {
      const loadImage = async () => {
        try {
          const base64Image = await fetchImage(imageId);
          setArticleData({ ...articleData, image: base64Image });
          setShowSuccessAlert(true);
        } catch (error) {
          console.error(error);
        }
      };
      loadImage();
    }
    setArticleData({ ...articleData, image: '' });
  }, [imageId]);

  const onSubmit = async (data: FormValuesTypes) => {
    await updateArticle(data);
  };

  const updateArticle = async (data: FormValuesTypes) => {
    const updatedData = data;
    setIsLoading(true);
    updatedData.imageId = imageId || articleData.imageId;

    try {
      await updateArticleData(updatedData, id);
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
          <StyledArticleGrid container rowSpacing={3}>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item xs={12} sm="auto">
                <StyledH1 variant="h1">Edit article</StyledH1>
              </Grid>
              <StyledButtonGrid item xs={12} sm={3}>
                <Button type="submit" variant="contained">
                  Save Article
                </Button>
              </StyledButtonGrid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="title"
                defaultValue={articleData.title}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <TextField
                      label="Title"
                      error={Boolean(errors.title)}
                      helperText={errors.title ? 'Item is required' : ''}
                      id="title"
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
                defaultValue={articleData.perex}
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
              {articleData.image && typeof articleData.image === 'string' && (
                <div>
                  <p>Featured image:</p>
                  <StyledImageContainer>
                    <StyledImg key={imageId} src={articleData.image} alt="Uploaded" />
                    <Tooltip title="Delete upload file">
                      {articleData.image && imageId && !articleData.imageId ? (
                        <StyledIconImageButton
                          size="small"
                          color="primary"
                          onClick={() => deleteFile(imageId)}>
                          <Close />
                        </StyledIconImageButton>
                      ) : (
                        <StyledIconImageButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            deleteFile(articleData.imageId);
                            setArticleData({ ...articleData, image: '' });
                          }}>
                          <Close />
                        </StyledIconImageButton>
                      )}
                    </Tooltip>
                  </StyledImageContainer>
                </div>
              )}
            </Grid>
            <Grid item xs={8}>
              {!articleData.image && !imageId && (
                <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />
              )}
            </Grid>
            <Grid item xs={8}>
              <MarkdownControlled />
            </Grid>
          </StyledArticleGrid>
        </form>
      </FormProvider>
    </StyledBox>
  );
};

export default EditArticle;
