import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    config.baseURL = baseURL;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const httpPost = async <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  const response = await axios.post(`${baseURL}${url}`, data, defaultConfig);
  return response;
};

export const httpGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const response = await axios.get(`${baseURL}${url}`, defaultConfig);
  return response;
};

export const httpGetImage = async <T>(
  url: string,
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  config.headers = {
    'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7'
  };
  const response = await axios.get(`${baseURL}${url}`, config);
  return response;
};

export const httpPatch = <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  const response = axios.patch(`${baseURL}${url}`, data, defaultConfig);
  return response;
};

export const httpDelete = async (url: string): Promise<void> => {
  await axios.delete(`${baseURL}${url}`, defaultConfig);
};
