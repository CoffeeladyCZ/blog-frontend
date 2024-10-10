import { FormDetailType } from '../types/Articles';
import useSupabase from './useSupabase';

export function useArticle() {
  const supabase = useSupabase();

  const getArticleDetail = async (articleId: string) => {
    if (!supabase) {
      return null;
    }
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single();
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  };

  const getArticleList = async () => {
    if (!supabase) {
      return null;
    }
    const { data, error } = await supabase.from('articles').select('*');
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  };

  const createArticleData = async (data: FormDetailType) => {
    if (supabase) {
      const { error } = await supabase.from('articles').insert([data]);

      if (error) {
        console.error(error);
      }
    }
  };

  return { getArticleDetail, getArticleList, createArticleData };
}
