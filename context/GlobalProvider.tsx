import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import apiClient from '@/service/api/config';  
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await apiClient.get<User>('/api/current-user');
          if (response.data) {
            setIsLogged(true);
            setUser(response.data);
          } else {
            setIsLogged(false);
            setUser(null);
          }
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

    checkCurrentUser();
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
