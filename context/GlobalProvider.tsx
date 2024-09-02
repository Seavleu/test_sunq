import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import api from '@/service/api/config';
import userStore from '@/stores/userStore';  

interface User {
  user_id: string;
  user_pw: string;
  sun_q_a_t: string;
}

interface GlobalContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    const initializeAuth = async () => {
      await userStore.loadToken(); // Load token from secure store
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
        const response = await api.get<User>('/api/user/me');
        if (response.data) {
          setIsLogged(true);
          setUser(response.data);
          await userStore.setUserInfo(response.data); // Store user info securely
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

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get('/api/refreshToken');
            const newToken = response.data.accessToken;
            await userStore.setToken(newToken); // Store the new token securely
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            await userStore.logout(); // Clear token and user info securely
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
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
