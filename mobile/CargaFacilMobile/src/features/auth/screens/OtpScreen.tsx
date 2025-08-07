import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthService } from '../services/authService';
import { useAuth } from '../../../contexts/AuthContext';

type RootStackParamList = {
  PhoneInput: undefined;
  OtpScreen: { phone: string };
  Principal: undefined;
};

type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OtpScreen'>;

type Props = {
  route: {
    params: {
      phone: string;
    };
  };
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user_id?: number;
    debug_otp?: string;
    // Adicione outras propriedades que sua API pode retornar
  };
};

export default function OtpScreen({ route }: Props) {
  const navigation = useNavigation<OtpScreenNavigationProp>();
  const { phone } = route.params;
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const verifyCode = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse = await AuthService.verifyOtp(phone, code);
      
      if (response.success && response.data?.token && response.data.user_id) {
        // Criar objeto user com valores padrão seguros
        const user = {
          id: response.data.user_id,
          name: 'Usuário', // Valor padrão
          phone: phone,
          // photo é opcional e pode ficar undefined
        };
        
        await login(response.data.token, user);
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'Principal' }],
        });
      } else {
        Alert.alert('Erro', response.message || 'Código inválido');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao verificar código');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificação de Código</Text>
      <Text style={styles.subtitle}>Insira o código enviado para {phone}</Text>
      
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
        placeholder="123456"
      />

      {isLoading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <Button 
          title="Verificar" 
          onPress={verifyCode}
          disabled={code.length !== 6}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 18,
  },
  loader: {
    marginVertical: 20,
  },
});
