import React from 'react';
import { View, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { styles } from './styles';
import { useAuth } from '@contexts/AuthContext';

const CustomDrawer = (props: any) => {
  const { authState, logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userContainer}>
        <Image 
          source={{ uri: authState.user?.photo || 'https://via.placeholder.com/80' }} 
          style={styles.userPhoto} 
        />
        <Text style={styles.userName}>{authState.user?.name || 'Usuário'}</Text>
        <Text style={styles.userPhone}>{authState.user?.phone || ''}</Text>
      </View>
      
      <DrawerItem
        label="Histórico de Transportes"
        onPress={() => props.navigation.navigate('History')}
      />
      <DrawerItem
        label="Suporte"
        onPress={() => props.navigation.navigate('Support')}
      />
      <DrawerItem
        label="Sair"
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;