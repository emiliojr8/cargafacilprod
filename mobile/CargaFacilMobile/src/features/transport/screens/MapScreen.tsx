// src/screens/MapScreen.tsx
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const MapScreen = () => {
  // Mock data - substituir por dados reais
  const drivers = [
    { id: 1, latitude: -25.9667, longitude: 32.5833, name: 'Motorista 1' },
    { id: 2, latitude: -25.9567, longitude: 32.5933, name: 'Motorista 2' },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -25.9667,
          longitude: 32.5833,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {drivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
            title={driver.name}
            pinColor="blue"
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

export default MapScreen;