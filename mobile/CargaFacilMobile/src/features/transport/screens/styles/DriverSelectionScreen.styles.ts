import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
  },
  priceLabel: {
    fontWeight: '600',
  },
  priceValue: {
    fontWeight: 'bold',
  },
  driversList: {
    marginTop: 10,
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  driverVehicle: {
    color: '#666',
    fontSize: 14,
  },
  driverRating: {
    color: '#FCCC2A',
    marginTop: 5,
  },
  driverPrice: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});