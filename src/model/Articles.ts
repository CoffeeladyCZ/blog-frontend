export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ArticlesList = {
  articles: Article[];
};

export type FormValuesTypes = {
  articleId: string;
  title: string;
  imageId: string | undefined;
  content: string;
  perex: string;
};
