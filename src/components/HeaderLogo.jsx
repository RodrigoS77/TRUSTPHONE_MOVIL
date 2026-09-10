import React from 'react';
import { View, Text, Image } from 'react-native';
import { loginStyles } from '../styles/loginStyles';

export const HeaderLogo = () => {
  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      {/* Logo de TrustPhone */}
      <Image
        source={require('../../assets/images/ChatGPT Image 10 sept 2026, 01_53_23 p.m..png')}
        style={loginStyles.logoImage}
        resizeMode="contain"
      />

      {/* Welcome Title & Subtitle */}
      <Text style={loginStyles.title}>Bienvenido</Text>
      <Text style={loginStyles.subtitle}>
        Ingresa tus datos para poder empezar a comprar
      </Text>
    </View>
  );
};
