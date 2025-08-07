// src/styles/global.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

// Estilos reutilizáveis (ex: botões, inputs, textos)
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.medium,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.large,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
});