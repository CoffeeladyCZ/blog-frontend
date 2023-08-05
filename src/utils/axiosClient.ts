import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://fullstack.exercise.applifting.cz';

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(`${baseURL}${url}`, {
      headers: {
        token: Cookies.get('token')
      },
      ...params
    }),
  post: <T>(url: string, data: object) =>
    axios.post<T>(`${baseURL}${url}`, data, {
      headers: {
        token: Cookies.get('token')
      }
    }),
  patch: <T>(url: string, data: object) =>
    axios.patch<T>(`${baseURL}${url}`, data, {
      headers: {
        token: Cookies.get('token')
      }
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(`${baseURL}${url}`, {
      headers: {
        token: Cookies.get('token')
      }
    })
};

const client = axios.create({ baseURL: baseURL });

export const request = () => {
  client.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;
  client.defaults.headers.common['X-API-KEY'] = 'd4234190-5f6b-4d51-b3f3-80cc4810d0b7';
};
