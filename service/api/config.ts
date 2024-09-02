import axios from 'axios';
import { EXPO_API_URL } from '@env';
import userStore from '@/stores/userStore';

const api = axios.create({
  baseURL: EXPO_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 || error.response.status === 403) {
      try {
       // 토큰 새로 고침 시도
        const refreshResponse = await api.get('/api/refreshToken');
        const newToken = refreshResponse.data.accessToken;

        // 새 토큰 저장
        await userStore.setToken(newToken);

        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // 새로 고침에 실패할 경우 사용자 로그아웃
        await userStore.logout();
        console.log('Logged out due to token refresh failure.');
        return Promise.reject(refreshError);
      }
    }

    // console.error('Response error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export { api };  

export default api;
