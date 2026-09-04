import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginStyles } from '../styles/loginStyles';

export const SocialButton = ({ title, provider, onPress }) => {
  return (
    <TouchableOpacity
      style={loginStyles.socialButton}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {provider === 'google' ? (
        <Ionicons name="logo-google" size={20} color="#EA4335" />
      ) : (
        <Ionicons name="logo-apple" size={22} color="#000000" />
      )}
      <Text style={loginStyles.socialText}>{title}</Text>
    </TouchableOpacity>
  );
};
