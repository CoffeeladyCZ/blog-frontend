export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ArticleDetailTypes = {
  articleId: string;
  comments: string[];
  content: string;
  createdAt: string;
  imageId: string;
  lastUpdatedAt: string;
  perex: string;
  title: string;
  image?: string;
};

export const defaultArticleValues = {
  articleId: '',
  title: '',
  imageId: '',
  content: '',
  perex: ''
};

export const defaultArticleDetailValues = {
  articleId: '',
  comments: [],
  title: '',
  imageId: '',
  content: '',
  perex: '',
  createdAt: '',
  lastUpdatedAt: ''
};

export type FormValuesTypes = {
  articleId: string;
  title: string;
  imageId: string | null;
  image?: string;
  content?: string;
  perex: string;
};

export type ImageType = {
  imageId: string;
  name: string;
};

export type FormLoginType = {
  username: string;
  password: string;
};

export type DialogDataType = {
  title: string;
  articleId: number;
};

export type ApiResponseType = {
  success: boolean;
  error?: ErrorType;
};

export type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};

export type ArticleListResponse = {
  items: Article[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
