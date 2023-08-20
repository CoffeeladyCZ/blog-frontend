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
  imageId: string | null;
  content: string;
  perex: string;
};

export type ImageType = {
  imageId: string;
  name: string;
};
