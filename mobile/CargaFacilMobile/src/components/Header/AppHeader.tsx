// src/components/Header/AppHeader.tsx
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

interface AppHeaderProps {
  navigation?: {
    toggleDrawer?: () => void;
  };
}

const AppHeader: React.FC<AppHeaderProps> = ({ navigation }) => {
  const handleMenuPress = () => {
    if (navigation?.toggleDrawer) {
      navigation.toggleDrawer();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('@assets/images/cflogo-2.png')}
        style={styles.logo}
      />
      <TouchableOpacity 
        onPress={handleMenuPress}
        style={styles.menuButton}
      >
        <Icon name="menu" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;