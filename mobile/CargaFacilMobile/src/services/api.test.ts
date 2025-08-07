import { authApi } from '../features/auth/services/api';
import { Alert } from 'react-native';

interface TestResult {
  success: boolean;
  status?: number;
  error?: string;
  data?: any;
}

export const runApiTests = async (): Promise<TestResult> => {
  try {
    // 1. Teste de conexão básica
    const connectionTest = await authApi.testConnection();
    console.log('Connection Test:', connectionTest);
    
    if (!connectionTest.success) {
      throw new Error(connectionTest.error || 'Falha na conexão básica');
    }

    // 2. Teste do endpoint de OTP
    const otpTest = await authApi.requestOtp('+258841234567');
    console.log('OTP Test:', otpTest);
    
    if (otpTest.error) {
      throw new Error(otpTest.error);
    }

    // 3. Teste de verificação (usando código de debug se disponível)
    if (otpTest.debug_otp) {
      const verifyTest = await authApi.verifyOtp('+258841234567', otpTest.debug_otp);
      console.log('Verify Test:', verifyTest);
      
      if (verifyTest.error) {
        throw new Error(verifyTest.error);
      }
    } else {
      console.warn('Debug OTP não disponível - pulando teste de verificação');
    }
    
    Alert.alert('Testes API', 'Todos os testes passaram com sucesso!');
    return { success: true, data: { connectionTest, otpTest } };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    console.error('API Test Error:', error);
    Alert.alert('Erro nos Testes', errorMessage);
    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

export const executeTests = async () => {
  return await runApiTests();
};