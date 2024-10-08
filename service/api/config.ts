import axios from 'axios';
import { EXPO_API_URL } from '@env';
import userStore from '@/utils/storage';

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

// 토큰 만료 처리 및 토큰 자동 새로 고침
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const refreshResponse = await api.get('/api/refreshToken');          // 토큰 새로 고침 시도
        const newToken = refreshResponse.data.accessToken;

        await userStore.setToken(newToken);                                  // 새 토큰 저장

        originalRequest.headers.Authorization = `Bearer ${newToken}`;        // 새 토큰으로 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        await userStore.logout();                                            // 새로 고침에 실패할 경우 사용자 로그아웃
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
