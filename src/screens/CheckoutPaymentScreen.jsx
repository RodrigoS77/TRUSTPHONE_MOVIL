import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, borderRadius, spacing, shadows } from '../styles/theme';
import StepIndicator from '../components/StepIndicator';
import useCheckout from '../hooks/useCheckout';

export const CheckoutPaymentScreen = ({
  cart,
  currentUser,
  onBack,
  onSuccess,
}) => {
  const {
    selectedMethod,
    setSelectedMethod,
    cardNumber,
    expiry,
    cvv,
    showCvv,
    setShowCvv,
    loading,
    handleCardNumberChange,
    handleExpiryChange,
    handleCvvChange,
    handleConfirmOrder,
  } = useCheckout();

  const subtotal = cart.reduce((sum, item) => sum + (item.precio || item.price || 0) * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const formattedSubtotal = subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 });

  // Resumen conciso de nombres de productos (ej. "iPhone 13 + Samsung S22")
  const productNamesSummary = cart.map(i => i.nombre || i.name || i.modelo || 'Celular').slice(0, 2).join(' + ') +
    (cart.length > 2 ? ` (+${cart.length - 2} más)` : '');

  return (
    <View style={styles.container}>
      {/* Header Dark Navy */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleCenter}>
          <Text style={styles.headerTitle}>Finalizar Pago</Text>
          <View style={styles.securityTagRow}>
            <View style={styles.cyanDot} />
            <Text style={styles.securityTagText}>CHECKOUT SEGURO</Text>
          </View>
        </View>
        <View style={styles.lockIconContainer}>
          <Ionicons name="lock-closed" size={16} color="#38BDF8" />
        </View>
      </View>

      {/* Indicador de los 3 pasos */}
      <StepIndicator currentStep={2} theme="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card: Resumen de compra desplegable / conciso */}
          <View style={styles.purchaseSummaryCard}>
            <View style={styles.summaryTopRow}>
              <View style={styles.summaryTitleRow}>
                <Ionicons name="bag-handle-outline" size={18} color={colors.primary} />
                <Text style={styles.summaryTitle}>
                  Resumen de compra ({totalItems})
                </Text>
              </View>
              <Text style={styles.summaryTotalTop}>${formattedSubtotal}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryDetailRow}>
              {/* Miniatura del primer producto */}
              <View style={styles.miniImageContainer}>
                {cart[0]?.imagen || cart[0]?.imageUrl ? (
                  <Image
                    source={{ uri: cart[0].imagen || cart[0].imageUrl }}
                    style={styles.miniImage}
                  />
                ) : (
                  <Ionicons name="phone-portrait-outline" size={24} color="#94A3B8" />
                )}
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.productsSummaryText} numberOfLines={1}>
                  {productNamesSummary}
                </Text>
                <Text style={styles.shippingSummaryText}>
                  Envío express El Salvador (San Salvador, La Libertad y cobertura nacional)
                </Text>
              </View>

              <View style={styles.gratisBadge}>
                <Text style={styles.gratisBadgeText}>GRATIS</Text>
              </View>
            </View>

            <View style={styles.subtotalAccumulatedRow}>
              <Text style={styles.subtotalAccumulatedLabel}>Subtotal acumulado</Text>
              <Text style={styles.subtotalAccumulatedValue}>${formattedSubtotal}</Text>
            </View>
          </View>

          {/* Sección: Método de Pago */}
          <View style={styles.paymentSectionHeader}>
            <Text style={styles.paymentSectionTitle}>Método de pago</Text>
            <View style={styles.tlsBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#0D9488" />
              <Text style={styles.tlsText}>Cifrado TLS 256-bit</Text>
            </View>
          </View>

          {/* Opción 1: Tarjeta de Débito (Recomendado) */}
          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'Tarjeta de Débito' && styles.methodCardSelected,
            ]}
            onPress={() => setSelectedMethod('Tarjeta de Débito')}
            activeOpacity={0.9}
          >
            <View style={styles.methodHeaderRow}>
              <View style={styles.radioRow}>
                <View style={[
                  styles.radioOuter,
                  selectedMethod === 'Tarjeta de Débito' && styles.radioOuterSelected,
                ]}>
                  {selectedMethod === 'Tarjeta de Débito' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.methodName}>Tarjeta de Débito</Text>
              </View>

              <View style={styles.badgesRow}>
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedBadgeText}>Recomendado</Text>
                </View>
                <View style={styles.cardLogoBadge}>
                  <Text style={styles.cardLogoText}>VISA</Text>
                </View>
                <View style={styles.cardLogoBadge}>
                  <Text style={styles.cardLogoText}>MC</Text>
                </View>
              </View>
            </View>

            <Text style={styles.banksSupportedText}>
              Banco Agrícola, BAC Credomatic, Banco Cuscatlán y redes locales
            </Text>

            {/* Formulario de tarjeta desplegado si Débito está seleccionado */}
            {selectedMethod === 'Tarjeta de Débito' && (
              <View style={styles.cardForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Número de tarjeta</Text>
                  <View style={styles.cardInputWrapper}>
                    <TextInput
                      style={styles.cardInput}
                      value={cardNumber}
                      onChangeText={handleCardNumberChange}
                      placeholder="4000 •••• •••• 8824"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      maxLength={19}
                    />
                    <Ionicons name="card-outline" size={20} color="#0D9488" />
                  </View>
                </View>

                <View style={styles.rowTwoInputs}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Vencimiento</Text>
                    <TextInput
                      style={styles.cardInput}
                      value={expiry}
                      onChangeText={handleExpiryChange}
                      placeholder="MM/AA (ej. 08/28)"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.inputLabel}>CVV / CVC</Text>
                      <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
                        <Ionicons
                          name={showCvv ? "eye-off-outline" : "help-circle-outline"}
                          size={14}
                          color="#64748B"
                        />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.cardInput}
                      value={cvv}
                      onChangeText={handleCvvChange}
                      placeholder="•••"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      secureTextEntry={!showCvv}
                      maxLength={4}
                    />
                  </View>
                </View>

                <View style={styles.securityNoticeRow}>
                  <Ionicons name="lock-closed" size={13} color="#0D9488" />
                  <Text style={styles.securityNoticeText}>
                    Transacción cifrada en USD con tokenización 3DS segura
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Opción 2: Tarjeta de Crédito */}
          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'Tarjeta de Crédito' && styles.methodCardSelected,
            ]}
            onPress={() => setSelectedMethod('Tarjeta de Crédito')}
            activeOpacity={0.9}
          >
            <View style={styles.methodHeaderRow}>
              <View style={styles.radioRow}>
                <View style={[
                  styles.radioOuter,
                  selectedMethod === 'Tarjeta de Crédito' && styles.radioOuterSelected,
                ]}>
                  {selectedMethod === 'Tarjeta de Crédito' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.methodName}>Tarjeta de Crédito</Text>
              </View>

              <View style={styles.cuotasBadge}>
                <Text style={styles.cuotasBadgeText}>Hasta 12 Cuotas Tasa 0%</Text>
              </View>
            </View>

            <Text style={styles.banksSupportedText}>
              BAC Credomatic, Banco Agrícola, Cuscatlán, Davivienda y Promerica
            </Text>

            {/* Formulario si Crédito está seleccionado */}
            {selectedMethod === 'Tarjeta de Crédito' && (
              <View style={styles.cardForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Número de tarjeta</Text>
                  <View style={styles.cardInputWrapper}>
                    <TextInput
                      style={styles.cardInput}
                      value={cardNumber}
                      onChangeText={handleCardNumberChange}
                      placeholder="4000 •••• •••• 8824"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      maxLength={19}
                    />
                    <Ionicons name="card-outline" size={20} color="#0D9488" />
                  </View>
                </View>

                <View style={styles.rowTwoInputs}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Vencimiento</Text>
                    <TextInput
                      style={styles.cardInput}
                      value={expiry}
                      onChangeText={handleExpiryChange}
                      placeholder="MM/AA"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>CVV / CVC</Text>
                    <TextInput
                      style={styles.cardInput}
                      value={cvv}
                      onChangeText={handleCvvChange}
                      placeholder="•••"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      secureTextEntry={!showCvv}
                      maxLength={4}
                    />
                  </View>
                </View>

                <View style={styles.securityNoticeRow}>
                  <Ionicons name="lock-closed" size={13} color="#0D9488" />
                  <Text style={styles.securityNoticeText}>
                    Transacción cifrada en USD con tokenización 3DS segura
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Barra Inferior Fija de Pago */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomTotalRow}>
          <View>
            <Text style={styles.bottomTotalLabel}>TOTAL A PAGAR</Text>
            <Text style={styles.bottomTotalValue}>${formattedSubtotal} USD</Text>
          </View>
          <View style={styles.expressTagRight}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="car-outline" size={14} color="#0D9488" />
              <Text style={styles.expressTagText}>Envío Express Gratis</Text>
            </View>
            <Text style={styles.taxesIncludedText}>Impuestos incluidos</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, loading && styles.confirmBtnDisabled]}
          onPress={() => handleConfirmOrder(cart, currentUser, onSuccess)}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.confirmBtnText}>
                Continuar a Resumen y Confirmar (${formattedSubtotal})
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0F2544', // Dark Navy Blue
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.md + 1,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  securityTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  cyanDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
  },
  securityTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#38BDF8',
    letterSpacing: 0.8,
  },
  lockIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 130, // Espacio para barra inferior
  },
  purchaseSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryTotalTop: {
    fontSize: fontSize.sm + 1,
    fontWeight: '800',
    color: colors.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  summaryDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniImageContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  miniImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productsSummaryText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  shippingSummaryText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  gratisBadge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 6,
  },
  gratisBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F766E',
  },
  subtotalAccumulatedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  subtotalAccumulatedLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  subtotalAccumulatedValue: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  paymentSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentSectionTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tlsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tlsText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  methodCardSelected: {
    borderColor: '#0D9488',
    backgroundColor: '#FAFDFF',
  },
  methodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#0D9488',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0D9488',
  },
  methodName: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recommendedBadge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recommendedBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F766E',
  },
  cardLogoBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  cardLogoText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  cuotasBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cuotasBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  banksSupportedText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 30,
    marginBottom: 10,
  },
  cardForm: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  cardInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
  },
  cardInput: {
    flex: 1,
    height: 44,
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
  },
  rowTwoInputs: {
    flexDirection: 'row',
  },
  securityNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  securityNoticeText: {
    fontSize: 10,
    color: '#0F766E',
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 14,
    ...shadows.card,
  },
  bottomTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  bottomTotalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  bottomTotalValue: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  expressTagRight: {
    alignItems: 'flex-end',
  },
  expressTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  taxesIncludedText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  confirmBtn: {
    backgroundColor: '#0F2544',
    borderRadius: borderRadius.md,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...shadows.button,
  },
  confirmBtnDisabled: {
    opacity: 0.7,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
  },
});

export default CheckoutPaymentScreen;
