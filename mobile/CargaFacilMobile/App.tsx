import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}