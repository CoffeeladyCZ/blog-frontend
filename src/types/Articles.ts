// Default values

export const defaultArticleValues = {
  article_id: '',
  title: '',
  image_id: '',
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
  id: string;
  article_id: string;
  author: string;
  title: string;
  perex: string;
  image_id: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ArticleDetailTypes = {
  article_id: string;
  author: string;
  comments: CommentType[];
  content: string;
  created_at: string;
  image_id: string;
  last_updated_at: string;
  perex: string;
  title: string;
  image?: string;
};

export type ImageType = {
  imageId: string;
  imageUrl: string;
  name: string;
};

export type DialogDataType = {
  title: string;
  article_id: string;
  image_id: string;
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
  title: string;
  image_id: string | null;
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
