// src/services/AuthService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/';

const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    AUTH: {
      WEB: {
        LOGIN: 'auth/web/login/',
        REGISTER: 'auth/web/register/',
        LOGOUT: 'auth/web/logout/',
      },
      MOBILE: {
        REQUEST_OTP: 'auth/mobile/request-otp/',
        VERIFY_OTP: 'auth/mobile/verify-otp/',
      },
      REFRESH: 'auth/refresh/',
    },
  },
  TOKEN_KEYS: {
    AUTH: 'cargafacil_auth_token',
    REFRESH: 'cargafacil_refresh_token',
  },
};

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(API_CONFIG.TOKEN_KEYS.AUTH);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(API_CONFIG.TOKEN_KEYS.REFRESH);

      if (refreshToken) {
        try {
          const res = await api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, { refresh: refreshToken });
          localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH, res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.removeItem(API_CONFIG.TOKEN_KEYS.AUTH);
          localStorage.removeItem(API_CONFIG.TOKEN_KEYS.REFRESH);
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login?session_expired=true';
          }
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

const AuthService = {
  async register(userData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.WEB.REGISTER, {
        username: userData.username,
        telefone: userData.telefone,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        user_type: userData.user_type,
      });

      if (response.data.token) {
        localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH, response.data.token);
        if (response.data.refresh) {
          localStorage.setItem(API_CONFIG.TOKEN_KEYS.REFRESH, response.data.refresh);
        }
        return response.data;
      }

      throw new Error(response.data?.message || 'Resposta de registro inválida');
    } catch (error) {
      console.error('Erro detalhado no registro:', error.response?.data);
      throw this.handleError(error);
    }
  },

  async login(credentials) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.WEB.LOGIN, {
        username: credentials.username,
        password: credentials.password,
        user_type: credentials.user_type,
      });

      if (response.data.token) {
        localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH, response.data.token);
        if (response.data.refresh) {
          localStorage.setItem(API_CONFIG.TOKEN_KEYS.REFRESH, response.data.refresh);
        }
        return response.data;
      }

      throw new Error('Resposta de login inválida');
    } catch (error) {
      console.error('Erro detalhado no login:', error.response?.data);
      throw this.handleError(error);
    }
  },

  logout() {
    localStorage.removeItem(API_CONFIG.TOKEN_KEYS.AUTH);
    localStorage.removeItem(API_CONFIG.TOKEN_KEYS.REFRESH);
    return api.post(API_CONFIG.ENDPOINTS.AUTH.WEB.LOGOUT);
  },

  requestOtp(phone) {
    return api.post(API_CONFIG.ENDPOINTS.AUTH.MOBILE.REQUEST_OTP, { telefone: phone });
  },

  verifyOtp(phone, code) {
    return api.post(API_CONFIG.ENDPOINTS.AUTH.MOBILE.VERIFY_OTP, { phone, code });
  },

  isAuthenticated() {
    return !!localStorage.getItem(API_CONFIG.TOKEN_KEYS.AUTH);
  },

  handleError(error) {
    const errorData = error.response?.data || {};
    return {
      status: error.response?.status || 0,
      message: errorData.message || errorData.detail || 'Erro na comunicação com o servidor',
      errors: errorData.errors || null,
    };
  },
};

export default AuthService;
