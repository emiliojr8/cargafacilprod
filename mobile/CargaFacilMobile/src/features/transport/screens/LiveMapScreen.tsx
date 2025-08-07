// src/screens/Map/LiveMapScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import api from '@services/api';

// Definindo tipos explicitamente
interface Location {
  lat: number;
  lng: number;
}

interface Driver {
  id: string;
  name: string;
  location: Location;
}

interface ApiResponse {
  data: Driver[];
}

export default function LiveMapScreen() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Tipando a resposta da API
        const response = await api.get<ApiResponse>('/drivers/nearby', {
          params: { lat: -25.96, lng: 32.58 }
        });
        setDrivers(response.data.data); // Acesso correto aos dados tipados
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -25.96,
          longitude: 32.58,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {drivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.location.lat,
              longitude: driver.location.lng,
            }}
            title={driver.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});