// src/services/api.ts

import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Create an Axios instance with a base URL and timeout.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Simple retry interceptor for failed requests.
api.interceptors.response.use(
  response => response,
  async (error: AxiosError & { config: AxiosRequestConfig & { __retryCount?: number } }) => {
    const config = error.config;
    if (!config || config.__retryCount === undefined) {
      config.__retryCount = 0;
    }
    // Limit the number of retries.
    if (config.__retryCount < 1) {
      config.__retryCount += 1;
      return api(config);
    }
    return Promise.reject(error);
  }
);

// Example API call: Get Contributions with caching fallback.
export const getContributions = async (): Promise<any> => {
  try {
    const response = await api.get('/contributions');
    // Cache the response in localStorage for offline use.
    localStorage.setItem('contributions', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    // On error, try to retrieve cached data.
    const cachedData = localStorage.getItem('contributions');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
};

// Example API call: Post a new contribution.
export const postContribution = async (data: any): Promise<any> => {
  try {
    const response = await api.post('/contributions', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
