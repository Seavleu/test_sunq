import React, { createContext, useContext, ReactNode } from 'react';
import { useInitializeAuth } from '@/hooks/useInitializeAuth';
import { useAuthInterceptor } from '@/hooks/useAuthInterceptor';
import { useRefreshToken } from '@/hooks/useRefreshToken';

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
  const { isLogged, setIsLogged, user, setUser, loading } = useInitializeAuth();
  
  // Use custom hooks for interceptors
  useAuthInterceptor();
  useRefreshToken(setIsLogged, setUser);

  return (
    <GlobalContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
