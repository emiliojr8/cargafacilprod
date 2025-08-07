import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
  },
});