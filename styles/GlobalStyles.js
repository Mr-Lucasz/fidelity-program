// styles/GlobalStyles.js
import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#007AFF',
  secondary: '#FF9500',
  background: '#F5F5F5',
  text: '#222',
  error: '#FF3B30',
  success: '#4CD964',
  white: '#FFF',
  gray: '#8E8E93',
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
  size: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 28,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  title: {
    fontSize: FONTS.size.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  text: {
    color: COLORS.text,
    fontSize: FONTS.size.medium,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.size.medium,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
    fontSize: FONTS.size.medium,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.size.small,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
});
