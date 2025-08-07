import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '@components/Header/AppHeader';
import { TransportStackParamList, RootDrawerParamList } from 'types/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { styles } from './styles/TrackingScreen.styles';

type TrackingRouteProp = RouteProp<TransportStackParamList, 'Tracking'>;

export default function TrackingScreen() {
  const route = useRoute<TrackingRouteProp>();
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Acompanhamento de Entrega</Text>
        <Text style={styles.subtitle}>Nº do pedido: {route.params.shipmentId}</Text>
        
        <View style={styles.statusContainer}>
          <View style={styles.statusStep}>
            <View style={[styles.statusDot, styles.activeDot]} />
            <Text style={styles.statusText}>Pedido aceito</Text>
          </View>
          
          <View style={styles.statusLine} />
          
          <View style={styles.statusStep}>
            <View style={[styles.statusDot, styles.activeDot]} />
            <Text style={styles.statusText}>A caminho</Text>
          </View>
          
          <View style={styles.statusLine} />
          
          <View style={styles.statusStep}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Entrega concluída</Text>
          </View>
        </View>

        <View style={styles.mapPlaceholder}>
          <Text>Mapa de rastreamento será exibido aqui</Text>
        </View>
      </View>
    </View>
  );
}