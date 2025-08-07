// src/components/Auth/PhoneInput.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { validateMozambiquePhone } from '../../../utils/phoneUtils';

export default function PhoneInput({ onSubmit }: { onSubmit: (phone: string) => void }) {
  const [phone, setPhone] = useState('+258');

  const handleSubmit = () => {
    if (!validateMozambiquePhone(phone)) {
      Alert.alert('Número inválido', 'Por favor insira um número moçambicano válido (+2588XXXXXXXX)');
      return;
    }
    onSubmit(phone);
  };

  return (
    <View>
      <Text>Número de Telemóvel:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="+2588XXXXXXXX"
      />
      <Button title="Continuar" onPress={handleSubmit} />
    </View>
  );
}