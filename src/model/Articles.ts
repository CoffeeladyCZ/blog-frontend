export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ArticlesList = {
  articles: [Article];
};

export type FormValuesTypes = {
  title: string;
  image: string;
  content: string;
};
