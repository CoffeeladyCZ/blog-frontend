import { httpGetImage, httpGet, httpPatch, httpPost } from '../utils/axiosService';

import { blobToBase64 } from '../utils/utils';
import {
  ArticleDetailTypes,
  FormDetailType,
  CommentResponseType,
  ArticleType,
  ArticleListResponse,
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
    const data: ArticleType[] = await response.data.items;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateArticleData = async (data: FormDetailType, id: string) => {
  try {
    httpPatch(`/articles/${id}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const createCommentData = async (data: CommentResponseType) => {
  try {
    await httpPost<CommentResponseType>('/comments', data);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        response: {
          data: {
            message: (error as ErrorType)?.response?.data?.message || 'Something was wrong'
          }
        }
      }
    };
  }
};
