import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { authApi } from '@services/api';

const OtpTestScreen = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
    console.log(message);
  };

  const testOtpFlow = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      addLog('=== INICIANDO TESTE OTP ===');
      
      const phone = '258841234567'; // Número de teste
      addLog(`Enviando OTP para: ${phone}`);

      // 1. Solicitar OTP
      addLog('Solicitando código OTP...');
      const otpResponse = await authApi.requestOtp(phone);
      addLog(`Resposta: ${JSON.stringify(otpResponse)}`);
      
      if (otpResponse.debug_otp) {
        addLog(`Código OTP (DEBUG): ${otpResponse.debug_otp}`);
        
        // 2. Verificar OTP
        addLog('Verificando código OTP...');
        const verifyResponse = await authApi.verifyOtp(phone, otpResponse.debug_otp);
        addLog(`Resposta verificação: ${JSON.stringify(verifyResponse)}`);
        
        Alert.alert('Sucesso', 'Fluxo OTP testado com sucesso!');
      } else {
        addLog('Nenhum código OTP retornado (modo produção?)');
      }
      
      addLog('=== TESTE COMPLETADO ===');
    } catch (error: any) {
      addLog(`ERRO: ${error.message}`);
      Alert.alert('Erro', error.message || 'Falha no teste OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Fluxo OTP</Text>
      
      <Button 
        title={loading ? "Testando..." : "Executar Teste"} 
        onPress={testOtpFlow}
        disabled={loading}
      />
      
      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Logs:</Text>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>
            {`• ${log}`}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  logsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  logsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
    marginVertical: 2,
  },
});

export default OtpTestScreen;