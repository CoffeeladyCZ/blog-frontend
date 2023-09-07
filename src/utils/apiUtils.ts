import { httpGetImage, httpGet, httpPatch, httpPost } from '../utils/axiosService';
import Cookies from 'js-cookie';

import { blobToBase64 } from '../utils/utils';
import {
  ArticleDetailTypes,
  FormValuesTypes,
  FormLoginType,
  CommentResponseType,
  Article,
  ArticleListResponse,
  ApiResponseType,
  LoginResponse,
  ErrorType
} from '../types/Articles';

export async function getImageData(imageId: string) {
  try {
    const imageResponse = await httpGetImage<string>(`/images/${imageId}`, {
      responseType: 'blob'
    });
    const imageBlob = new Blob([imageResponse.data]);
    const base64Image = await blobToBase64(imageBlob);
    return base64Image;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getDetailArticle = async (
  id: string | undefined
): Promise<ArticleDetailTypes | void> => {
  if (id) {
    try {
      const response = await httpGet<ArticleDetailTypes>(`/articles/${id}`);
      const article = response.data;
      const imageId = response.data.imageId;
      if (imageId) {
        const image = await getImageData(imageId);
        return { ...article, image };
      } else {
        return article;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const getArticleList = async () => {
  try {
    const response = await httpGet<ArticleListResponse>('/articles');
    const data: Article[] = await response.data.items;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateArticleData = async (data: FormValuesTypes, id: string) => {
  try {
    httpPatch(`/articles/${id}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const createArticleData = async (data: FormValuesTypes) => {
  try {
    await httpPost('/articles', data);
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (data: FormLoginType): Promise<ApiResponseType> => {
  try {
    const response = await httpPost<LoginResponse>('/login', data);
    const access_token = await response.data.access_token;
    Cookies.set('token', access_token);
    const loginTime = new Date();
    localStorage.setItem('loginTime', loginTime.toISOString());
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        response: {
          data: {
            message: (error as ErrorType)?.response?.data?.message || 'Unknown error'
          }
        }
      }
    };
  }
};

export const createCommentData = async (data: CommentResponseType) => {
  try {
    await httpPost<CommentResponseType>('/comments', data);
  } catch (error) {
    console.error(error);
  }
};
