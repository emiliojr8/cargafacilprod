import axios from 'axios';
import { Config } from '../config';

const API = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: Config.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para tratamento de erros
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirecionar para login
    }
    return Promise.reject(error);
  }
);

export const AuthAPI = {
  requestOTP: (phone: string) => API.post(Config.ENDPOINTS.AUTH + 'request-otp', { phone }),
  verifyOTP: (data: { phone: string; code: string }) => 
    API.post(Config.ENDPOINTS.AUTH + 'verify-otp', data),
};

export const ShipmentsAPI = {
  getActive: () => API.get(Config.ENDPOINTS.SHIPMENTS + 'active/'),
  create: (data: any) => API.post(Config.ENDPOINTS.SHIPMENTS, data),
};