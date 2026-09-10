import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useCustomData from '../hooks/useCustomData';
import { colors, fontSize, borderRadius, spacing, shadows } from '../styles/theme';
import { loginStyles } from '../styles/loginStyles';

export const VerifyEmailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { verifyCodeClient, registerClient } = useCustomData();

  const email = params?.email || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert('Código requerido', 'Por favor ingresa el código de verificación que recibiste por correo.');
      return;
    }

    setLoading(true);

    try {
      const result = await verifyCodeClient(code.trim());
      setLoading(false);

      if (result.success) {
        Alert.alert(
          '¡Cuenta Verificada!',
          'Tu cuenta ha sido verificada y guardada exitosamente en la base de datos. Ya puedes iniciar sesión.',
          [
            {
              text: 'Iniciar Sesión',
              onPress: () => router.replace('/'),
            },
          ]
        );
      } else {
        Alert.alert(
          'Error de Verificación',
          result.error || 'El código ingresado es incorrecto o ha expirado.',
          [{ text: 'Reintentar' }]
        );
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

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
            {/* Botón Volver */}
            <View style={styles.topNavRow}>
              <TouchableOpacity
                onPress={handleGoBack}
                style={styles.backBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Icono de Correo */}
            <View style={styles.iconContainer}>
              <Ionicons name="mail-unread-outline" size={32} color="#FFFFFF" />
            </View>

            {/* Títulos */}
            <Text style={loginStyles.title}>Verifica tu Correo</Text>
            <Text style={loginStyles.subtitle}>
              Hemos enviado un código de verificación a tu dirección de correo electrónico. Ingrésalo para activar tu cuenta.
            </Text>

            {/* Badge de correo electrónico */}
            {Boolean(email) && (
              <View style={styles.emailBadge}>
                <Ionicons name="mail-outline" size={15} color={colors.primary} />
                <Text style={styles.emailBadgeText} numberOfLines={1}>
                  {email}
                </Text>
              </View>
            )}

            {/* Campo de Código */}
            <View style={styles.codeContainer}>
              <Text style={styles.inputLabel}>CÓDIGO DE VERIFICACIÓN</Text>
              <TextInput
                value={code}
                onChangeText={(val) => setCode(val.toUpperCase())}
                placeholder="EJ. A1B2C3"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={8}
                style={styles.codeInput}
              />
              <Text style={styles.helperText}>
                Ingresa los 6 caracteres alfanuméricos recibidos por correo.
              </Text>
            </View>

            {/* Botón de Confirmación */}
            <TouchableOpacity
              style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.verifyButtonText}>Verificar Cuenta</Text>
              )}
            </TouchableOpacity>

            {/* Enlace para volver a iniciar sesión */}
            <View style={[loginStyles.footerRow, { marginTop: 24 }]}>
              <Text style={loginStyles.footerText}>¿Ya verificaste tu cuenta? </Text>
              <TouchableOpacity onPress={() => router.replace('/')} activeOpacity={0.7}>
                <Text style={loginStyles.footerLink}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topNavRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.button,
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    maxWidth: '90%',
  },
  emailBadgeText: {
    marginLeft: 6,
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  codeContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  codeInput: {
    width: '100%',
    height: 56,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 6,
    color: colors.textPrimary,
  },
  helperText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: 'center',
  },
  verifyButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default VerifyEmailScreen;
