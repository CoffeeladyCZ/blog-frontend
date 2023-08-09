import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://fullstack.exercise.applifting.cz';

const defaultConfig = {
  headers: {
    'X-API-KEY': 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7',
    Autorization: `Bearer ${Cookies.get('token')}`
  }
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = 'https://fullstack.exercise.applifting.cz';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const httpPost = (url: string, data = {}) => {
  axios.post(`${baseURL}${url}`, data, defaultConfig);
};

export const httpGet = (url: string) => {
  axios.get(`${baseURL}${url}`, defaultConfig);
};

export const httpPatch = (url: string, data = {}) => {
  axios.patch(`${baseURL}${url}`, data, defaultConfig);
};

export const httpDelete = (url: string) => {
  axios.delete(`${baseURL}${url}`, defaultConfig);
};
