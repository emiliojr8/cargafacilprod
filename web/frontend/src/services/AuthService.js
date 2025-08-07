// src/services/AuthService.js
import axios from 'axios';

const BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/').replace(/\/?$/, '/');
console.log('URL final da API carregada no frontend:', BASE_URL);

const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    AUTH: {
      WEB: {
        LOGIN: 'auth/web/login/',
        REGISTER: 'auth/web/register/',
        LOGOUT: 'auth/web/logout/',
        PROFILE: 'auth/web/profile/',
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

// ✅ Variáveis de controle para refresh token
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ✅ Interceptor de request: adiciona token se necessário
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(API_CONFIG.TOKEN_KEYS.AUTH);
  const publicPaths = [
    API_CONFIG.ENDPOINTS.AUTH.WEB.LOGIN,
    API_CONFIG.ENDPOINTS.AUTH.WEB.REGISTER,
    API_CONFIG.ENDPOINTS.AUTH.MOBILE.REQUEST_OTP,
    API_CONFIG.ENDPOINTS.AUTH.MOBILE.VERIFY_OTP,
  ];

  const isPublic = publicPaths.some((publicPath) => config.url?.includes(publicPath));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Interceptor de response: tenta refresh se necessário
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem(API_CONFIG.TOKEN_KEYS.REFRESH);

      if (!refreshToken) {
        console.warn('Sem refresh token, redirecionando para login.');
        AuthService.logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.warn('Tentando renovar token...');
        const res = await api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, { refresh: refreshToken });
        const newAccessToken = res.data.access;
        const newRefreshToken = res.data.refresh;

        if (newAccessToken) {
          localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH, newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem(API_CONFIG.TOKEN_KEYS.REFRESH, newRefreshToken);
          }
          api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          onRefreshed(newAccessToken);
          return api(originalRequest);
        }
      } catch (err) {
        console.error('Erro ao tentar refresh do token:', err.response?.data || err.message);
        AuthService.logout();
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?session_expired=true';
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const AuthService = {
  async register(userData) {
    try {
      const payload = {
        telefone: userData.telefone,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        user_type: userData.user_type,
        data_nascimento: userData.data_nascimento || '',
        provincia: userData.provincia || '',
        veiculo: userData.veiculo || '',
        capacidade_carga: userData.capacidade_carga || '',
        numero_carta_conducao: userData.numero_carta_conducao || '',
        nome: userData.nome || '',
      };

      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.WEB.REGISTER, payload);
      if (response.data.token) {
        localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH, response.data.token);
        if (response.data.refresh) {
          localStorage.setItem(API_CONFIG.TOKEN_KEYS.REFRESH, response.data.refresh);
        }
        return response.data;
      }
      throw new Error('Resposta inválida');
    } catch (error) {
      console.error('Erro no registro:', error.response?.data);
      throw this.handleError(error);
    }
  },

  async login(credentials) {
    try {
      const { telefone, password, user_type } = credentials;
      const loginData = { telefone, password, user_type };
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.WEB.LOGIN, loginData);

      if (response.data.token) {
        localStorage.setItem(API_CONFIG.TOKEN_KEYS.AUTH, response.data.token);
        if (response.data.refresh) {
          localStorage.setItem(API_CONFIG.TOKEN_KEYS.REFRESH, response.data.refresh);
        }
        return response.data;
      }
      throw new Error('Resposta inválida');
    } catch (error) {
      console.error('Erro no login:', error.response?.data);
      throw this.handleError(error);
    }
  },

  async getProfile() {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.WEB.PROFILE);
      console.log('Perfil carregado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error.response?.data);
      throw this.handleError(error);
    }
  },

  async updateProfile(formData) {
    try {
      console.log('Enviando dados do perfil (update):');
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await api.put(API_CONFIG.ENDPOINTS.AUTH.WEB.PROFILE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Resposta ao atualizar perfil:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.response?.data);
      throw this.handleError(error);
    }
  },

  logout() {
    localStorage.removeItem(API_CONFIG.TOKEN_KEYS.AUTH);
    localStorage.removeItem(API_CONFIG.TOKEN_KEYS.REFRESH);
    return Promise.resolve();
  },

  requestOtp(telefone) {
    return api.post(API_CONFIG.ENDPOINTS.AUTH.MOBILE.REQUEST_OTP, { phone: telefone });
  },

  verifyOtp(telefone, code) {
    return api.post(API_CONFIG.ENDPOINTS.AUTH.MOBILE.VERIFY_OTP, { phone: telefone, code });
  },

  isAuthenticated() {
    return !!localStorage.getItem(API_CONFIG.TOKEN_KEYS.AUTH);
  },

  handleError(error) {
    const errorData = error.response?.data || {};
    return {
      status: error.response?.status || 0,
      message: errorData.message || errorData.detail || 'Erro na comunicação com o servidor',
      errors: errorData.errors || errorData.non_field_errors || null,
    };
  },
};

export default AuthService;
export { api };
