import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'config';

export const axios = Axios.create({
    baseURL: API_URL,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true,
  });
  
//   axios.interceptors.response.use(
//     (response) => {
//       return response.data;
//     }
// )