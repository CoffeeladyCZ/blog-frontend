import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import MarkdownEditor from '@uiw/react-md-editor';
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

const EditArticle: React.FC = () => {
  const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<FormValuesTypes>(defaultArticleValues);

  const { id = '' } = useParams<{ id: string }>();
  const { uploadFile, deleteFile, imageId } = useFileUpload();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValuesTypes>({
    mode: 'onChange'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const article = await getDetailArticle(id);
        if (article) {
          setArticleData(article);
          if (article.image) {
            setImage(article.image);
          }
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

  const onSubmit = async (data: FormValuesTypes) => {
    await updateArticle(data);
  };

  const updateArticle = async (data: FormValuesTypes) => {
    setIsLoading(true);
    data.imageId = imageId;
    data.content = content;
    try {
      updateArticleData(data, id);
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
            <TextField
              label="Title"
              {...register('title', {
                required: articleData.title === '' ? 'Error' : false
              })}
              value={articleData.title}
              onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              id="title"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Perex"
              {...register('perex', {
                required: articleData.perex === '' ? 'Error' : false
              })}
              value={articleData.perex}
              onChange={(e) => setArticleData({ ...articleData, perex: e.target.value })}
              error={Boolean(errors.perex)}
              helperText={errors.perex?.message}
              id="title"
              placeholder="Perex"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {image && typeof image === 'string' && (
              <div>
                <p>Featured image:</p>
                <StyledImageContainer>
                  <StyledImg src={image} alt="Uploaded" />
                  <Tooltip title="Delete upload file">
                    {image && !articleData.imageId ? (
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
                        onClick={() => deleteFile(articleData.imageId)}>
                        <Close />
                      </StyledIconImageButton>
                    )}
                  </Tooltip>
                </StyledImageContainer>
              </div>
            )}
          </Grid>
          <Grid item xs={8}>
            {!image && !imageId && (
              <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />
            )}
          </Grid>
          <Grid item xs={8}>
            <MarkdownEditor
              id="content"
              value={content}
              onChange={(event) => {
                setContent(event || '');
              }}
              height={500}
              data-color-mode="light"
            />
          </Grid>
        </StyledArticleGrid>
      </form>
    </StyledBox>
  );
};

export default EditArticle;
