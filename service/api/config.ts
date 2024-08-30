import axios from 'axios';
import { EXPO_API_URL } from '@env';
import userStore from '@/stores/userStore';

const apiClient = axios.create({
  baseURL: EXPO_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = userStore.token;  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found.');
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
