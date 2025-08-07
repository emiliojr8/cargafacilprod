import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import AppHeader from '@components/Header/AppHeader';
import { TransportStackParamList, RootDrawerParamList } from 'types/navigation';
import { styles } from './styles/DeliveryOptionsScreen.styles';

type DeliveryOptionsNavigationProp = StackNavigationProp<TransportStackParamList, 'DeliveryOptions'>;

export default function DeliveryOptionsScreen() {
  const stackNavigation = useNavigation<DeliveryOptionsNavigationProp>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  
  const [deliveryOption, setDeliveryOption] = useState<'driver' | 'recipient' | 'concierge' | 'mailbox'>('driver');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const handleContinue = () => {
    if (deliveryOption === 'recipient' && !recipientPhone) {
      Alert.alert('Erro', 'Por favor, insira o número do destinatário');
      return;
    }
    
    stackNavigation.navigate('CargoDetails', {
      deliveryOption,
      ...(deliveryOption === 'recipient' && { recipientPhone }),
      deliveryNotes
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader navigation={drawerNavigation} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Com quem vai deixar a carga?</Text>
        
        {['driver', 'recipient', 'concierge', 'mailbox'].map((option) => (
          <TouchableOpacity 
            key={option}
            style={[styles.option, deliveryOption === option && styles.selectedOption]}
            onPress={() => setDeliveryOption(option as any)}
          >
            <Text>
              {option === 'driver' ? 'Vou com o motorista' :
               option === 'recipient' ? 'Com o destinatário' :
               option === 'concierge' ? 'Na portaria' : 'Na caixa de correio'}
            </Text>
          </TouchableOpacity>
        ))}

        {deliveryOption === 'recipient' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone do Destinatário*</Text>
            <TextInput
              style={styles.input}
              placeholder="+258 8X XXX XXXX"
              keyboardType="phone-pad"
              value={recipientPhone}
              onChangeText={setRecipientPhone}
            />
          </View>
        )}

        {deliveryOption !== 'driver' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Observações (Opcional)</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Detalhes sobre a entrega..."
              multiline
              value={deliveryNotes}
              onChangeText={setDeliveryNotes}
            />
          </View>
        )}

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}