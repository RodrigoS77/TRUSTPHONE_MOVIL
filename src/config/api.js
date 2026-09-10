import Constants from 'expo-constants';
import { Platform } from 'react-native';

// IP local del servidor en la red actual (PC que ejecuta el backend)
const DEFAULT_HOST_IP = '10.10.4.6';
const BACKEND_PORT = '4000';

// Obtiene la URL base del backend detectando dinámicamente la IP de la PC en Expo
export const getBaseHost = () => {
  // Si se ejecuta en navegador web
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.location?.hostname) {
      return `http://${window.location.hostname}:${BACKEND_PORT}`;
    }
    return `http://localhost:${BACKEND_PORT}`;
  }

  // Detectar IP del host dinámicamente desde Expo
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.expoGoConfig?.debuggerHost ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost ||
    '';

  let detectedIp = hostUri ? hostUri.split(':')[0] : null;

  if (!detectedIp) {
    const linkingUrl = Constants.experienceUrl || Constants.linkingUri || '';
    const match = linkingUrl.match(/\/\/([^:/]+)/);
    if (match && match[1] && match[1] !== 'localhost' && match[1] !== '127.0.0.1') {
      detectedIp = match[1];
    }
  }

  if (detectedIp && detectedIp !== 'localhost' && detectedIp !== '127.0.0.1') {
    return `http://${detectedIp}:${BACKEND_PORT}`;
  }

  // Dispositivos físicos (Android o iOS) o emuladores en la misma red
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return `http://${DEFAULT_HOST_IP}:${BACKEND_PORT}`;
  }

  return `http://localhost:${BACKEND_PORT}`;
};
