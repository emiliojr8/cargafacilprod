import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import AppHeader from '@components/Header/AppHeader';
import { TransportStackParamList, RootDrawerParamList } from 'types/navigation';
import { styles } from './styles/DriverSelectionScreen.styles';

type DriverSelectionRouteProp = RouteProp<TransportStackParamList, 'DriverSelection'>;
type DriverSelectionNavigationProp = StackNavigationProp<TransportStackParamList, 'DriverSelection'>;

export default function DriverSelectionScreen() {
  const route = useRoute<DriverSelectionRouteProp>();
  const stackNavigation = useNavigation<DriverSelectionNavigationProp>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const availableDrivers = [
    { id: 1, name: 'João M.', rating: 4.8, price: 1200, vehicle: 'Toyota Hilux' },
    { id: 2, name: 'Carlos S.', rating: 4.7, price: 1100, vehicle: 'Nissan NP200' },
    { id: 3, name: 'António T.', rating: 4.9, price: 1300, vehicle: 'Mitsubishi L200' },
  ];

  const handleSelectDriver = (driverId: number) => {
    stackNavigation.navigate('Tracking', {
      shipmentId: '12345',
      ...route.params
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader navigation={drawerNavigation} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Motoristas Disponíveis</Text>
        <Text style={styles.subtitle}>Destino: {route.params.destination}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Preço estimado:</Text>
          <Text style={styles.priceValue}>
            {Math.min(...availableDrivers.map(d => d.price))} - {Math.max(...availableDrivers.map(d => d.price))} MZN
          </Text>
        </View>

        <View style={styles.driversList}>
          {availableDrivers.map((driver) => (
            <TouchableOpacity
              key={driver.id}
              style={styles.driverCard}
              onPress={() => handleSelectDriver(driver.id)}
            >
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverVehicle}>{driver.vehicle}</Text>
                <Text style={styles.driverRating}>⭐ {driver.rating}</Text>
              </View>
              <Text style={styles.driverPrice}>{driver.price} MZN</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}