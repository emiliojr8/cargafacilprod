import axios from 'axios';
import { Alert } from 'react-native';

// 1. Define strict response types
interface OtpResponse {
  message?: string;
  debug_otp?: string;
  error?: string;
}

interface VerifyOtpResponse {
  token?: string;
  user_id?: number;
  is_new_user?: boolean;
  message?: string;
  error?: string;
}

interface TestConnectionResponse {
  success: boolean;
  status?: number;
  data?: any;
  error?: string;
}

const API_BASE_URL = 'http://192.168.43.132:8000/api/mobile';

// 2. Create axios instance with type hints
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// 3. Type guard for API errors
interface ApiError {
  config?: { url?: string };
  response?: { 
    status?: number;
    data?: { error?: string; message?: string };
  };
  message?: string;
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'message' in error)
  );
}

// 4. Strict typed API methods
export const authApi = {
  async requestOtp(phone: string): Promise<OtpResponse> {
    try {
      const cleanedPhone = phone.replace(/\D/g, '');
      const response = await api.post<OtpResponse>('/auth/request-otp/', { 
        phone: cleanedPhone 
      });

      // Type-safe access to response data
      const responseData = response.data as OtpResponse;

      if (__DEV__ && responseData.debug_otp) {
        Alert.alert('OTP (Desenvolvimento)', `Código: ${responseData.debug_otp}`);
      }

      return responseData;
    } catch (error) {
      if (isApiError(error)) {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           error.message ||
                           'Erro ao solicitar OTP';
        throw new Error(errorMessage);
      }
      throw new Error('Erro desconhecido ao solicitar OTP');
    }
  },

  async verifyOtp(phone: string, code: string): Promise<VerifyOtpResponse> {
    try {
      const cleanedPhone = phone.replace(/\D/g, '');
      const cleanedCode = code.trim();
      
      const response = await api.post<VerifyOtpResponse>('/auth/verify-otp/', {
        phone: cleanedPhone,
        code: cleanedCode
      });

      return response.data as VerifyOtpResponse;
    } catch (error) {
      if (isApiError(error)) {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           error.message ||
                           'Erro ao verificar OTP';
        throw new Error(errorMessage);
      }
      throw new Error('Erro desconhecido ao verificar OTP');
    }
  },

  async testConnection(): Promise<TestConnectionResponse> {
    try {
      const response = await api.get('/');
      return { 
        success: true, 
        status: response.status,
        data: response.data 
      };
    } catch (error) {
      if (isApiError(error)) {
        return {
          success: false,
          status: error.response?.status,
          error: error.response?.data?.error || error.message
        };
      }
      return {
        success: false,
        error: 'Erro desconhecido ao testar conexão'
      };
    }
  }
};

export default api;