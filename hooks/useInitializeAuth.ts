import { useState, useLayoutEffect } from 'react';
import api from '@/service/api/config';
import userStore from '@/stores/userStore';

export const useInitializeAuth = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    const initializeAuth = async () => {
      await userStore.loadToken(); 
      if (userStore.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}`;
        await fetchCurrentUser();
      } else {
        setIsLogged(false);
        setUser(null);
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await api.get<any>('/api/user/me'); // TODO: modify endpoint
        if (response.data) {
          setIsLogged(true);
          setUser(response.data);
          await userStore.setUserInfo(response.data);  
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.log('Error fetching current user:', error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return { isLogged, setIsLogged, user, setUser, loading };
};
