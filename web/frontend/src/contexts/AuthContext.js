import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Dados do usuário (perfil)
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null);     // Erros gerais

  // Carrega perfil usando token armazenado
  const loadUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const profileData = await AuthService.getProfile();
      setUser(profileData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err.message || 'Erro ao carregar perfil');
      await AuthService.logout();  // Garante limpeza se token inválido
    } finally {
      setLoading(false);
    }
  }, []);

  // Tenta carregar perfil no início se token existir
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [loadUserProfile]);

  // Login: chama AuthService.login e depois carrega perfil
  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await AuthService.login(credentials);
      await loadUserProfile();
      setError(null);
      return data;
    } catch (err) {
      setError(err.message || 'Erro no login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout: limpa estado e token
  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setError(null);
    setLoading(false);
  };

  // Atualiza perfil
  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const updatedUser = await AuthService.updateProfile(formData);
      setUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        loadUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exportação default e nomeada do contexto
export default AuthContext;
