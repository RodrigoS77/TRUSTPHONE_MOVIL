import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useAuthForm } from '../hooks/useAuthForm';
import { HeaderLogo } from '../components/HeaderLogo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { SocialButton } from '../components/SocialButton';
import { loginStyles } from '../styles/loginStyles';

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
    handleLogout,
    errors,
    focusedInput,
    setFocusedInput,
    handleLogin,
    handleSocialLogin,
    handleForgotPassword,
    handleSignUp,
  } = useAuthForm();

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
            {/* Header: Title, Squircle Shield Icon, Welcome Text */}
            <HeaderLogo />

            {/* If logged in: Show Logged-in Client Profile & API Data */}
            {currentUser ? (
              <View style={{ width: '100%' }}>
                <View style={loginStyles.profileCard}>
                  <View style={loginStyles.profileHeader}>
                    <View style={loginStyles.avatar}>
                      <Text style={loginStyles.avatarText}>
                        {(currentUser.nombre || 'U').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={loginStyles.profileTitle}>
                        {currentUser.nombre} {currentUser.Apellido}
                      </Text>
                      <Text style={loginStyles.profileSubtitle}>
                        {currentUser.correo}
                      </Text>
                    </View>
                  </View>

                  <View style={loginStyles.profileItem}>
                    <Text style={loginStyles.profileLabel}>Teléfono:</Text>
                    <Text style={loginStyles.profileValue}>{currentUser.telefono}</Text>
                  </View>

                  <View style={loginStyles.profileItem}>
                    <Text style={loginStyles.profileLabel}>Estado:</Text>
                    <Text style={[loginStyles.profileValue, { color: '#10B981' }]}>
                      {currentUser.estado}
                    </Text>
                  </View>

                  <View style={loginStyles.profileItem}>
                    <Text style={loginStyles.profileLabel}>Registro:</Text>
                    <Text style={loginStyles.profileValue}>
                      {currentUser.fechaRegistro
                        ? new Date(currentUser.fechaRegistro).toLocaleDateString()
                        : 'Reciente'}
                    </Text>
                  </View>

                  <View style={loginStyles.profileItem}>
                    <Text style={loginStyles.profileLabel}>API URL:</Text>
                    <Text style={[loginStyles.profileValue, { fontSize: 10 }]}>
                      localhost:4000/api/loginClientes
                    </Text>
                  </View>
                </View>

                <Button
                  title="Cerrar Sesión"
                  onPress={handleLogout}
                  loading={false}
                />
              </View>
            ) : (
              /* Login Form */
              <View style={loginStyles.form}>
                {/* Email Input */}
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

                {/* Password Input */}
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

                {/* Main Log In Button */}
                <Button
                  title="Log In"
                  onPress={handleLogin}
                  loading={loading}
                />
              </View>
            )}

            {!currentUser && (
              <>
                {/* Divider: OR CONTINUE WITH */}
                <Divider text="OR CONTINUE WITH" />

                {/* Social Logins: Google & Apple */}
                <View style={loginStyles.socialRow}>
                  <SocialButton
                    title="Google"
                    provider="google"
                    onPress={() => handleSocialLogin('Google')}
                  />
                  <SocialButton
                    title="Apple"
                    provider="apple"
                    onPress={() => handleSocialLogin('Apple')}
                  />
                </View>

                {/* Footer Register Link */}
                <View style={loginStyles.footerRow}>
                  <Text style={loginStyles.footerText}>¿No tienes una cuenta? </Text>
                  <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                    <Text style={loginStyles.footerLink}>Regístrate</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Subtle bottom indicator handle */}
            <View style={loginStyles.bottomIndicator} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default LoginScreen;
