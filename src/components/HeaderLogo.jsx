import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginStyles } from '../styles/loginStyles';
import { colors } from '../styles/theme';

export const HeaderLogo = () => {
  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      {/* Brand Title */}
      <Text style={loginStyles.appName}>TrustPhone</Text>

      {/* Brand Icon Shield Squircle */}
      <View style={loginStyles.iconBox}>
        <Ionicons name="shield-checkmark" size={32} color={colors.background} />
      </View>

      {/* Welcome Title & Subtitle */}
      <Text style={loginStyles.title}>Bienvenido</Text>
      <Text style={loginStyles.subtitle}>
        Ingresa tus datos para poder empezar a comprar
      </Text>
    </View>
  );
};
