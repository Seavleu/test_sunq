import axios from 'axios';
import { EXPO_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userStore from '@/stores/userStore';

const apiClient = axios.create({
  baseURL: EXPO_API_URL,
  timeout: 10000,  
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = userStore.token;  // Get token from userStore
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('No token found.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;
