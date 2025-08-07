import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import AppHeader from '@components/Header/AppHeader';
import { TransportStackParamList, RootDrawerParamList } from 'types/navigation';
import { styles } from './styles/DestinationScreen.styles';

type DestinationRouteProp = RouteProp<TransportStackParamList, 'DestinationScreen'>;
type DestinationNavigationProp = StackNavigationProp<TransportStackParamList, 'DestinationScreen'>;

export default function DestinationScreen() {
  const route = useRoute<DestinationRouteProp>();
  const stackNavigation = useNavigation<DestinationNavigationProp>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  
  const [destination, setDestination] = useState('');

  const handleContinue = () => {
    if (!destination) {
      Alert.alert('Erro', 'Por favor, insira o destino');
      return;
    }
    
    stackNavigation.navigate('DriverSelection', {
      destination,
      cargoDetails: {
        deliveryOption: route.params.deliveryOption,
        cargoType: route.params.cargoType,
        dimensions: route.params.dimensions
      }
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader navigation={drawerNavigation} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Para que destino?</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Digite o destino..."
          value={destination}
          onChangeText={setDestination}
        />

        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Sugestões:</Text>
          {['Maputo', 'Matola', 'Beira'].map((city) => (
            <TouchableOpacity
              key={city}
              style={styles.suggestion}
              onPress={() => setDestination(city)}
            >
              <Text>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Procurar Transporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}