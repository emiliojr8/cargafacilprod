// src/types/navigation.ts
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootDrawerParamList = {
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
  };
  DriverSelection: {
    destination: string;
    cargoDetails: any;
  };
  Tracking: {
    shipmentId: string;
  };
};

export type MainTabsParamList = {
  Transporte: undefined;
  Auxiliares: undefined;
};

export type AppHeaderProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};