import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import AppHeader from '@components/Header/AppHeader';
import { RootDrawerParamList, TransportStackParamList } from 'types/navigation';
import { styles } from './styles/CargoDetailsScreen.styles';

type CargoDetailsRouteProp = RouteProp<TransportStackParamList, 'CargoDetails'>;
type CargoDetailsNavigationProp = StackNavigationProp<TransportStackParamList, 'CargoDetails'>;

export default function CargoDetailsScreen() {
  const route = useRoute<CargoDetailsRouteProp>();
  const stackNavigation = useNavigation<CargoDetailsNavigationProp>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const [cargoType, setCargoType] = useState<'small' | 'medium' | 'large' | null>(null);
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const handleContinue = () => {
    if (!cargoType) {
      Alert.alert('Erro', 'Por favor, selecione o tipo de carga');
      return;
    }
    
    stackNavigation.navigate('DestinationScreen', {
      ...route.params,
      cargoType,
      dimensions
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader navigation={drawerNavigation} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Detalhes da Carga</Text>
        
        <Text style={styles.sectionTitle}>Tipo de Carga*</Text>
        <View style={styles.optionsRow}>
          {(['small', 'medium', 'large'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeOption, cargoType === type && styles.selectedType]}
              onPress={() => setCargoType(type)}
            >
              <Text style={styles.typeText}>
                {type === 'small' ? 'Pequena' : type === 'medium' ? 'Média' : 'Grande'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Dimensões (Opcional)</Text>
        <View style={styles.dimensionsContainer}>
          {['length', 'width', 'height', 'weight'].map((dimension) => (
            <View key={dimension} style={styles.dimensionInput}>
              <Text style={styles.dimensionLabel}>
                {dimension === 'length' ? 'Comprimento (cm)' :
                 dimension === 'width' ? 'Largura (cm)' :
                 dimension === 'height' ? 'Altura (cm)' : 'Peso (kg)'}
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={dimensions[dimension as keyof typeof dimensions]}
                onChangeText={(text) => setDimensions({...dimensions, [dimension]: text})}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}