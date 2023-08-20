import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://fullstack.exercise.applifting.cz';

const defaultConfig = {
  headers: {
    'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
  }
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = baseURL;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const httpPost = async (url: string, data = {}): Promise<any> => {
  const response = await axios.post(`${baseURL}${url}`, data, defaultConfig);
  return response;
};

export const httpGet = async (url: string): Promise<any> => {
  const response = await axios.get(`${baseURL}${url}`, defaultConfig);
  return response;
};

export const httpGetImage = async (url: string, config: AxiosRequestConfig): Promise<any> => {
  config.headers = {
    'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
  };
  const response = await axios.get(`${baseURL}${url}`, config);
  return response;
};

export const httpPatch = (url: string, data = {}) => {
  axios.patch(`${baseURL}${url}`, data, defaultConfig);
};

export const httpDelete = async (url: string) => {
  await axios.delete(`${baseURL}${url}`, defaultConfig);
};
