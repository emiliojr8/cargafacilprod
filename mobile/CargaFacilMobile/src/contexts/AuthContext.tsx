// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  phone: string;
  photo?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null
  });

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userString = await AsyncStorage.getItem('user');
        
        if (token && userString) {
          setAuthState({
            isAuthenticated: true,
            token,
            user: JSON.parse(userString)
          });
        }
      } catch (error) {
        console.error('Failed to load auth state', error);
      }
    };

    loadAuthState();
  }, []);

  const login = async (token: string, user: User) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        token,
        user
      });
    } catch (error) {
      console.error('Failed to save auth state', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      
      setAuthState({
        isAuthenticated: false,
        token: null,
        user: null
      });
    } catch (error) {
      console.error('Failed to remove auth state', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};