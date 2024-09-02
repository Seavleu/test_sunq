import { useLayoutEffect } from 'react';
import api from '@/service/api/config';
import userStore from '@/stores/userStore';

export const useRefreshToken = (
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<any | null>>) => {

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && error.response.data.message === 'Unauthorized') {
          try {
            const response = await api.get('/api/refreshToken');
            const newToken = response.data.accessToken;
            await userStore.setToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            await userStore.logout();
            setIsLogged(false);
            setUser(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [setIsLogged, setUser]);
};
