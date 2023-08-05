import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/axiosClient';

type Article = {
  title: string;
  image: string;
  content: string;
};

const queryClient = useQueryClient();

const CREATE_ARTICLE_QUERY_KEY = 'articles';

const createArticle = async (articleData: Article) => {
  const response = await api.post('/articles', articleData);
  return response.data;
};

export const useCreateArticle = useMutation({
  mutationFn: createArticle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [CREATE_ARTICLE_QUERY_KEY] });
  }
});
