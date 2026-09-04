import React from 'react';
import { View, Text } from 'react-native';
import { loginStyles } from '../styles/loginStyles';

export const Divider = ({ text = 'OR CONTINUE WITH' }) => {
  return (
    <View style={loginStyles.dividerContainer}>
      <View style={loginStyles.dividerLine} />
      <Text style={loginStyles.dividerText}>{text}</Text>
      <View style={loginStyles.dividerLine} />
    </View>
  );
};
