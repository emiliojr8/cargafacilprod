// src/screens/Payment/PaymentScreen.tsx
import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '@services/api';

type RootStackParamList = {
  PaymentScreen: { amount: number };
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;

type Props = {
  route: PaymentScreenRouteProp;
};

export default function PaymentScreen({ route }: Props) {
  const { amount } = route.params;

  const handlePayment = async () => {
    try {
      await api.post('/payments/mpesa', {
        phone: '+258841234567',
        amount
      });
      Alert.alert('Sucesso', 'Pagamento iniciado via M-Pesa');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao processar pagamento');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>Total: {amount} MZN</Text>
      <Button 
         title="Pagar via M-Pesa" 
         onPress={handlePayment} 
        />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  amount: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});