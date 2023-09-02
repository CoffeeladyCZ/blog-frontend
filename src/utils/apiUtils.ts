import { ArticleDetailTypes, FormValuesTypes, Article } from '../model/Articles';
import { httpGetImage, httpGet, httpPatch, httpPost } from '../utils/axiosService';
import { blobToBase64 } from '../utils/utils';

export async function fetchImage(imageId: string) {
  try {
    const imageResponse = await httpGetImage(`/images/${imageId}`, {
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
      const response = await httpGet(`/articles/${id}`);
      const article = response.data;
      const imageId = response.data.imageId;
      if (imageId) {
        const image = await fetchImage(imageId);
        console.log('daa', { ...article, image });
        return { ...article, image };
      } else {
        console.log('daa', article);
        return article;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const getListArticles = async () => {
  try {
    const response = await httpGet('/articles');
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
