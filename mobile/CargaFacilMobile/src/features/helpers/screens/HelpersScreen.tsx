// src/features/helpers/screens/HelpersScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '@components/Header/AppHeader';

// Interface simples para a navegação
interface HelpersNavigation {
  toggleDrawer: () => void;
}

export default function HelpersScreen() {
  const navigation = useNavigation<HelpersNavigation>();

  return (
    <View style={{ flex: 1 }}>
      <AppHeader navigation={{ toggleDrawer: navigation.toggleDrawer }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Tela de Auxiliares</Text>
      </View>
    </View>
  );
}