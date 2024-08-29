import { Platform } from 'react-native';

const theme = {
  colors: {
    background: '#000C65',
    text: '#ffffff',
    primary: '#6200ee',
    secondary: '#03dac4',
    error: '#B00020',
    white: '#ffffff',
    black: '#000000',
    link: '#0a7ea4',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  typography: {
    base: {
      fontSize: 16,
      lineHeight: 24,
    },
    semiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color: '#0a7ea4',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: '#ffffff',
    },
    button: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
 },
 
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000C65',
    paddingTop: Platform.OS === 'android' ? 25 : 0, 
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
};

export default theme;
