import { useLayoutEffect } from 'react';
import api from '@/service/api/config';
import userStore from '@/stores/userStore';

export const useAuthInterceptor = () => {
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      const token = userStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, []);
};
