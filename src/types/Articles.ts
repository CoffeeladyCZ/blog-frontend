// Default values

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

// Types

export type ArticleType = {
  articleId: string;
  author: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ArticleDetailTypes = {
  articleId: string;
  comments: CommentType[];
  content: string;
  createdAt: string;
  imageId: string;
  lastUpdatedAt: string;
  perex: string;
  title: string;
  image?: string;
};

export type ImageType = {
  imageId: string;
  fileUrl: string;
  name: string;
};

export type DialogDataType = {
  title: string;
  articleId: number;
};

export type CommentType = {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
};

export type AlertType = {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  show: boolean;
};

// Form types

export type FormDetailType = {
  articleId: string;
  title: string;
  imageId: string | null;
  image?: string;
  content?: string;
  perex: string;
};

export type FormLoginType = {
  username: string;
  password: string;
};

export type FormCommentType = {
  content: string;
  author: string;
};

// API response types

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
  items: ArticleType[];
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

export type CommentResponseType = {
  content: string;
  articleId: string;
  author: string;
};
