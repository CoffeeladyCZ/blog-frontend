import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import MarkdownEditor from '@uiw/react-md-editor';
import { useParams, useNavigate } from 'react-router-dom';

import { Grid, Button, TextField, Tooltip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';

import { StyledBox, StyledHeadline1 } from '../styled/styled';
import { FormValuesTypes, defaultArticleValues } from '../model/Articles';
import { httpPatch, httpGetImage } from '../utils/axiosService';
import { useFileUpload } from '../hooks/useFileUpload';
import { blobToBase64 } from '../utils/utils';
import { fetchImage, getArticle } from '../utils/apiUtils';

import LoginPage from './LoginPage';
import Loading from '../components/Loading';
import MediaUploadInput from '../components/MediaUploadInput';
import Notification from '../components/Notification';

const StyledGrid = styled(Grid)`
  max-width: 1152px;
`;

const StyledImg = styled('img')`
  width: 200px;
  height: auto;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StyledImageContainer = styled('div')`
  position: relative;
  display: inline-block;
`;

const EditArticle: React.FC = () => {
  const [content, setContent] = useState<string>('You can use markdown! Yeeey!');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<FormValuesTypes>(defaultArticleValues);

  const { id } = useParams();
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
        const article = await getArticle(id);
        if (article) {
          setArticleData(article);
          if (article.image) {
            setImage(article.image);
            setShowSuccessAlert(true);
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

  const getImage = async (imageId: string) => {
    try {
      const imageResponse = await httpGetImage(`/images/${imageId}`, {
        responseType: 'blob'
      });
      const imageBlob = new Blob([imageResponse.data]);
      const base64Image = await blobToBase64(imageBlob);
      setImage(base64Image);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormValuesTypes) => {
    await updateArticle(data);
  };

  const updateArticle = async (data: FormValuesTypes) => {
    setIsLoading(true);
    data.imageId = imageId;
    data.content = content;

    try {
      httpPatch(`/articles/${id}`, data);
      setShowSuccessAlert(true);
      navigate('/articles');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    setIsLoading(false);
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
        <StyledGrid container rowSpacing={3}>
          <Grid item xs={4}>
            <StyledHeadline1 variant="h1">Edit article</StyledHeadline1>
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" variant="contained">
              Save Article
            </Button>
          </Grid>
          <Grid item xs={8}>
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
          <Grid item xs={8}>
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
          <Grid item xs={8}>
            {image && typeof image === 'string' && (
              <div>
                <p>Featured image:</p>
                <StyledImageContainer>
                  <StyledImg src={image} alt="Uploaded" />
                  <Tooltip title="Delete upload file">
                    <StyledIconButton size="small" color="primary" onClick={deleteFile}>
                      <Close />
                    </StyledIconButton>
                  </Tooltip>
                </StyledImageContainer>
              </div>
            )}
            {imageId && !image && (
              <div>
                <p>Featured image:</p>
                <StyledImageContainer>
                  <StyledImg src={imageId} alt="Uploaded" />
                  <Tooltip title="Delete upload file">
                    <StyledIconButton size="small" color="primary" onClick={deleteFile}>
                      <Close />
                    </StyledIconButton>
                  </Tooltip>
                </StyledImageContainer>
              </div>
            )}
          </Grid>
          <Grid item xs={8}>
            {!image && <MediaUploadInput onFileUpload={uploadFile} isLoading={isLoading} />}
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
        </StyledGrid>
      </form>
    </StyledBox>
  );
};

export default EditArticle;
