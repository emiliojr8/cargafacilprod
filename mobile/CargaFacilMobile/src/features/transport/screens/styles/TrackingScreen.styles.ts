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
  statusContainer: {
    marginBottom: 30,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FCCC2A',
    marginRight: 10,
  },
  activeDot: {
    backgroundColor: '#FCCC2A',
  },
  statusLine: {
    height: 20,
    width: 2,
    backgroundColor: '#FCCC2A',
    marginLeft: 7,
  },
  statusText: {
    fontSize: 14,
  },
  mapPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});