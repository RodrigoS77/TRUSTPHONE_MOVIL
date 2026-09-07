import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Obtiene la URL base del backend detectando dinámicamente la IP de la PC en Expo
export const getBaseHost = () => {
  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost || '';
  const hostIp = hostUri ? hostUri.split(':')[0] : null;

  if (hostIp) {
    return `http://${hostIp}:4000`;
  }

  // IP local del servidor en la red Wi-Fi para dispositivos físicos Android
  if (Platform.OS === 'android') {
    return 'http://10.92.189.225:4000';
  }

  return 'http://localhost:4000';
};

export const API_ENDPOINTS = {
  LOGIN_CLIENTES: () => `${getBaseHost()}/api/loginClientes`,
  CLIENTES: () => `${getBaseHost()}/api/clientes`,
  CELULARES: () => `${getBaseHost()}/api/celulares`,
};
