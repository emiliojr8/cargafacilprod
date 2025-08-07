import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';
import PhoneInputScreen from '../features/auth/screens/PhoneInputScreen';
import OtpScreen from '../features/auth/screens/OtpScreen';
import DeliveryOptionsScreen from '../features/transport/screens/DeliveryOptionsScreen';
import CargoDetailsScreen from '../features/transport/screens/CargoDetailsScreen';
import DestinationScreen from '../features/transport/screens/DestinationScreen';
import DriverSelectionScreen from '../features/transport/screens/DriverSelectionScreen';
import TrackingScreen from '../features/transport/screens/TrackingScreen';
import HelpersScreen from '../features/helpers/screens/HelpersScreen'; 
import CustomDrawer from '../components/MenuDrawer/CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Tipos para navegação
export type RootStackParamList = {
  Principal: undefined;
  Autenticação: undefined;
  History: undefined;
  Support: undefined;
};

export type AuthStackParamList = {
  PhoneInput: undefined;
  OtpScreen: { phone: string };
};

export type TransportStackParamList = {
  DeliveryOptions: undefined;
  CargoDetails: {
    deliveryOption: 'driver' | 'recipient' | 'concierge' | 'mailbox';
    recipientPhone?: string;
    deliveryNotes?: string;
  };
  DestinationScreen: {
    deliveryOption: string;
    cargoType: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
      weight: string;
    };
    recipientPhone?: string;
    deliveryNotes?: string;
    cargoDescription?: string;
  };
  DriverSelection: {
    destination: string;
    cargoDetails: any;
  };
  Tracking: {
    shipmentId: string;
  };
};

export type HelpersStackParamList = {
  HelpersHome: undefined;
  // Adicione outras rotas de auxiliares conforme necessário
};

export type MainTabsParamList = {
  TransportFlow: undefined;
  HelpersFlow: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const TransportStack = createStackNavigator<TransportStackParamList>();
const HelpersStack = createStackNavigator<HelpersStackParamList>();
const MainTab = createBottomTabNavigator<MainTabsParamList>();
const RootDrawer = createDrawerNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="PhoneInput" component={PhoneInputScreen} />
    <AuthStack.Screen 
      name="OtpScreen" 
      component={OtpScreen}
      options={({ route }) => ({ 
        title: `Verificar ${route.params.phone}` 
      })}
    />
  </AuthStack.Navigator>
);

const TransportNavigator = () => (
  <TransportStack.Navigator screenOptions={{ headerShown: false }}>
    <TransportStack.Screen name="DeliveryOptions" component={DeliveryOptionsScreen} />
    <TransportStack.Screen name="CargoDetails" component={CargoDetailsScreen} />
    <TransportStack.Screen name="DestinationScreen" component={DestinationScreen} />
    <TransportStack.Screen name="DriverSelection" component={DriverSelectionScreen} />
    <TransportStack.Screen name="Tracking" component={TrackingScreen} />
  </TransportStack.Navigator>
);

const HelpersNavigator = () => (
  <HelpersStack.Navigator screenOptions={{ headerShown: false }}>
    <HelpersStack.Screen name="HelpersHome" component={HelpersScreen} />
  </HelpersStack.Navigator>
);

const MainTabs = () => (
  <MainTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FCCC2A',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <MainTab.Screen
      name="TransportFlow"
      component={TransportNavigator}
      options={{
        tabBarLabel: 'Transporte',
        tabBarIcon: ({ color }) => <Icon name="local-shipping" size={24} color={color} />,
      }}
    />
    <MainTab.Screen
      name="HelpersFlow"
      component={HelpersNavigator}
      options={{
        tabBarLabel: 'Auxiliares',
        tabBarIcon: ({ color }) => <Icon name="people" size={24} color={color} />,
      }}
    />
  </MainTab.Navigator>
);

export default function AppNavigator() {
  const { authState } = useAuth();

  return (
    <RootDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: 'transparent',
      }}
    >
      {authState.isAuthenticated ? (
        <RootDrawer.Screen name="Principal" component={MainTabs} />
      ) : (
        <RootDrawer.Screen name="Autenticação" component={AuthNavigator} />
      )}
    </RootDrawer.Navigator>
  );
}

// Exportação do tipo RootDrawerParamList
export type RootDrawerParamList = {
  Principal: undefined;
  Autenticação: undefined;
  History: undefined;
  Support: undefined;
};
