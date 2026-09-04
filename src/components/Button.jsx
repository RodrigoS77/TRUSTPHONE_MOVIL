import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { loginStyles } from '../styles/loginStyles';
import { colors } from '../styles/theme';

export const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        loginStyles.primaryButton,
        (disabled || loading) && loginStyles.primaryButtonDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.background} />
      ) : (
        <Text style={loginStyles.primaryButtonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
