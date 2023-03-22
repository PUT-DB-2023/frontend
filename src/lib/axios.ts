import Axios from 'axios';
import { API_URL } from 'config';

export const axios = Axios.create({
  baseURL: "/api",
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

axios.interceptors.response.use(
  undefined,
  (error) => {
    return Promise.reject(error);
  }
);