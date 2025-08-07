import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthService } from '../services/authService';
import { globalStyles } from '../../../styles/global';

type RootStackParamList = {
  OtpScreen: { phone: string };
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'OtpScreen'>;

export default function PhoneInputScreen() {
  const [phone, setPhone] = useState('+258');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const validatePhone = (phoneNumber: string) => {
    return phoneNumber.startsWith('+258') && phoneNumber.length === 13;
  };

  const handleSubmit = async () => {
    if (!validatePhone(phone)) {
      Alert.alert('Erro', 'N�mero deve come�ar com +258 e ter 12 d�gitos (ex: +258841234567)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await AuthService.requestOtp(phone);
      
      if (response.success) {
        navigation.navigate('OtpScreen', { phone });
      } else {
        Alert.alert('Erro', response.message || 'Falha ao enviar OTP');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao enviar OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Digite seu n�mero</Text>
      
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={globalStyles.input}
        placeholder="+258841234567"
        maxLength={13}
      />
      
      <TouchableOpacity
        style={[globalStyles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={globalStyles.buttonText}>Enviar C�digo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
