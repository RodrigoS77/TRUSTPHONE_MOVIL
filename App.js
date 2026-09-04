import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Pantallas principales
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Componentes UI reutilizables
import { Button } from './src/components/Button';
import { Divider } from './src/components/Divider';
import { HeaderLogo } from './src/components/HeaderLogo';
import { HeaderRegisterLogo } from './src/components/HeaderRegisterLogo';
import { Input } from './src/components/Input';
import { SocialButton } from './src/components/SocialButton';

// Custom Hooks
import { useAuthForm } from './src/hooks/useAuthForm';
import { useRegisterForm } from './src/hooks/useRegisterForm';
import useCustomData from './src/hooks/useCustomData';

// Estilos y Configuración de Tema
import { loginStyles } from './src/styles/loginStyles';
import { colors, spacing, fontSize, borderRadius, shadows } from './src/styles/theme';

/**
 * Componente Principal de la Aplicación TrustPhone
 * Configurado para iniciar por defecto en la pantalla de Login.
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {currentScreen === 'login' ? (
        <LoginScreen onNavigateToRegister={() => setCurrentScreen('register')} />
      ) : (
        <RegisterScreen onNavigateToLogin={() => setCurrentScreen('login')} />
      )}
    </SafeAreaProvider>
  );
}

// Exportación de módulos para acceso modular en todo el proyecto
export {
  LoginScreen,
  RegisterScreen,
  Button,
  Divider,
  HeaderLogo,
  HeaderRegisterLogo,
  Input,
  SocialButton,
  useAuthForm,
  useRegisterForm,
  useCustomData,
  loginStyles,
  colors,
  spacing,
  fontSize,
  borderRadius,
  shadows,
};
