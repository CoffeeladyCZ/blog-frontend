import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/axiosClient';

type Article = {
  title: string;
  image: string;
  content: string;
};

const queryClient = useQueryClient();

const CREATE_ARTICLE_QUERY_KEY = 'articles';

// const getArticles = async (): Promise<Article> => {
//   const response = await api.get('articles');
//   return response.data as Article[];
// };

// export const useGetArticles = useQuery<Article, Error>({
//   queryKey: [CREATE_ARTICLE_QUERY_KEY],
//   queryFn: getArticles
// });
