import { ArticleDetailTypes } from '../model/Articles';
import { httpGetImage, httpGet } from '../utils/axiosService';
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
export const getArticle = async (id: string | undefined): Promise<ArticleDetailTypes | void> => {
  if (id) {
    try {
      const response = await httpGet(`/articles/${id}`);
      const article = response.data;
      const imageId = response.data.imageId;
      if (imageId) {
        const image = await fetchImage(imageId);
        return { ...article, image };
      } else {
        return article;
      }
    } catch (error) {
      console.error(error);
    }
  }
};
