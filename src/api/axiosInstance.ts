import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;


const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (import.meta.env.DEV) {
      console.log('Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }

    if (!config.params) {
      config.params = {};
    }
    config.params.key = API_KEY;

    // Add timestamp to prevent caching
    config.params._t = Date.now();

    return config;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log('Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('Response Error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }

    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;

      switch (status) {
        case 400:
          return Promise.reject(new Error(data?.message || 'Bad Request: Invalid parameters'));
        case 401:
          return Promise.reject(new Error('Unauthorized: Invalid API key'));
        case 403:
          return Promise.reject(new Error('Forbidden: Access denied'));
        case 404:
          return Promise.reject(new Error('Location not found'));
        case 429:
          return Promise.reject(new Error('Rate limit exceeded. Please try again later'));
        case 500:
          return Promise.reject(new Error('Server error. Please try again later'));
        default:
          return Promise.reject(new Error(data?.message || `Error ${status}: ${error.response.statusText}`));
      }
    } else if (error.request) {
      return Promise.reject(new Error('Network error: Unable to reach the weather service'));
    } else {
      return Promise.reject(new Error(error.message || 'An unexpected error occurred'));
    }
  }
);

export default axiosInstance;
