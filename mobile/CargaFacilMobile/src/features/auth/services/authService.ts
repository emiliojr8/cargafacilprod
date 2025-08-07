import { authApi } from './api';
import { detectOperator } from './smsService';

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user_id?: number;
    debug_otp?: string;
  };
}

export const AuthService = {
  async requestOtp(phone: string): Promise<AuthResponse> {
    try {
      const cleanedPhone = phone.replace(/\D/g, '');
      if (!cleanedPhone.startsWith('258') || cleanedPhone.length !== 12) {
        throw new Error('Número moçambicano inválido. Formato: +258XXXXXXXXX');
      }

      const operator = detectOperator(cleanedPhone);
      console.log(`Solicitando OTP para ${cleanedPhone} (${operator})`);

      const response = await authApi.requestOtp(cleanedPhone);

      return {
        success: true,
        message: response.message,
        data: {
          debug_otp: response.debug_otp
        }
      };
    } catch (error) {
      console.error('Erro ao solicitar OTP:', error);
      throw error;
    }
  },

  async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    try {
      const response = await authApi.verifyOtp(phone, code);
      
      return {
        success: true,
        data: {
          token: response.token,
          user_id: response.user_id
        }
      };
    } catch (error) {
      console.error('Erro ao verificar OTP:', error);
      throw error;
    }
  }
};