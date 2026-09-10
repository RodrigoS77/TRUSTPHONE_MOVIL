import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthForm } from '../hooks/useAuthForm';
import { HeaderLogo } from '../components/HeaderLogo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { loginStyles } from '../styles/loginStyles';
import DashboardScreen from './DashboardScreen';

export const LoginScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    loading,
    currentUser,
    updateCurrentUser,
    handleLogout,
    errors,
    focusedInput,
    setFocusedInput,
    handleLogin,
    handleSocialLogin,
    handleForgotPassword,
    handleSignUp,
  } = useAuthForm();

  // Si el usuario está autenticado, mostrar el Dashboard principal
  if (currentUser) {
    return (
      <DashboardScreen
        currentUser={currentUser}
        onLogout={handleLogout}
        onUpdateUser={updateCurrentUser}
      />
    );
  }

  // Formulario de Login
  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginStyles.card}>

            {/* Logo y bienvenida */}
            <HeaderLogo />

            {/* Campos del formulario */}
            <View style={loginStyles.form}>

              {/* Email */}
              <Input
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="name@company.com"
                leftIconText="@"
                keyboardType="email-address"
                autoCapitalize="none"
                isFocused={focusedInput === 'email'}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                error={errors.email}
              />

              {/* Contraseña */}
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                leftIconName="lock-closed-outline"
                showRightIcon={true}
                rightIconName={showPassword ? 'eye-outline' : 'eye-off-outline'}
                onPressRightIcon={toggleShowPassword}
                topRightLinkText="Forgot Password?"
                onPressTopRightLink={handleForgotPassword}
                isFocused={focusedInput === 'password'}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                error={errors.password}
              />

              {/* Botón Log In */}
              <Button
                title="Log In"
                onPress={handleLogin}
                loading={loading}
              />
            </View>

            {/* Enlace a Registro */}
            <View style={[loginStyles.footerRow, { marginTop: 24 }]}>
              <Text style={loginStyles.footerText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text style={loginStyles.footerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>

            {/* Indicador inferior */}
            <View style={loginStyles.bottomIndicator} />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
