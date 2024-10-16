import { FormDetailType, ImageType } from '../types/Articles';
import { supabase } from '../supabaseClient';
import { useFileUpload } from '../hooks/useFileUpload';

export function useArticle() {
  const { getImage } = useFileUpload();

  const getArticleDetail = async (articleId: string) => {
    if (!supabase) {
      return null;
    }
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('article_id', articleId)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    if (data.image_id) {
      const image = await getImage(data.image_id);
      return { ...data, image };
    }
    return data;
  };

  const getArticleList = async () => {
    if (!supabase) {
      return null;
    }
    const { data, error } = await supabase.from('articles').select();
    if (error) return null;

    return data;
  };

  const createArticleData = async (articleData: FormDetailType, image: ImageType) => {
    if (!supabase) return;

    // images
    const { error: imageError } = await supabase
      .from('images')
      .insert([{ image_id: image.imageId, name: image.name }])
      .select();

    if (imageError) {
      console.error('Error inserting image:', imageError);
      return;
    }

    // article
    const { error } = await supabase.from('articles').insert(articleData).select();

    if (error) {
      console.error(error);
    }
  };

  const deleteArticle = async (articleId: string, imageId: string) => {
    try {
      const { error: articleError } = await supabase
        .from('articles')
        .delete()
        .eq('article_id', articleId)
        .throwOnError();

      if (articleError) throw articleError;

      if (imageId) {
        const { data: imageData, error: imageError } = await supabase
          .from('images')
          .select()
          .eq('image_id', imageId)
          .single();

        if (imageError) throw imageError;

        if (imageData) {
          const imagePath = `images/${imageData.name}`;
          const { error: storageError } = await supabase.storage.from('images').remove([imagePath]);

          if (storageError) throw storageError;

          const { error: deleteImageError } = await supabase
            .from('images')
            .delete()
            .eq('image_id', imageId);

          if (deleteImageError) throw deleteImageError;
        }
      }
    } catch (error) {
      throw new Error(`Error deleting article or image: ${error}`);
    }
  };

  return { getArticleDetail, getArticleList, createArticleData, deleteArticle };
}
