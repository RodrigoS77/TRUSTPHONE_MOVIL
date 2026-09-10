import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, borderRadius, spacing, shadows } from '../styles/theme';
import StepIndicator from '../components/StepIndicator';

export const CheckoutSuccessScreen = ({
  order,
  onGoToOrders,
  onContinueShopping,
}) => {
  const numeroOrden = order?.numeroOrden || '#SV-98245';
  const articulos = order?.articulos || [];
  const totales = order?.totales || {
    subtotal: 969.00,
    costoEnvio: 0,
    iva: 125.97,
    total: 969.00,
  };
  const metodoPago = order?.metodoPago || {
    tipo: 'Tarjeta de Débito',
    ultimos4: '8824',
    transaccionId: 'TX-773910',
    estadoCobro: 'Cobro Aprobado',
  };
  const direccion = order?.direccionEntrega || {
    titulo: 'Colonia Escalón, San Salvador',
    direccion: 'Avenida Masferrer Norte #340, San Salvador, El Salvador',
    tipoEnvio: 'Envío Express El Salvador',
  };

  const formattedSubtotal = Number(totales.subtotal).toLocaleString('es-ES', { minimumFractionDigits: 2 });
  const formattedTotal = Number(totales.total).toLocaleString('es-ES', { minimumFractionDigits: 2 });

  return (
    <View style={styles.container}>
      {/* Header Dark Navy */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onContinueShopping} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Pago</Text>
        <View style={styles.lockIconContainer}>
          <Ionicons name="lock-closed" size={16} color="#38BDF8" />
        </View>
      </View>

      {/* Indicador de los 3 pasos (todos completados) */}
      <StepIndicator currentStep={3} theme="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Éxito */}
        <View style={styles.successBanner}>
          <View style={styles.successIconCircle}>
            <Ionicons name="checkmark" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.verifiedTag}>PAGO VERIFICADO CON ÉXITO</Text>
          <Text style={styles.thanksTitle}>¡Gracias por tu compra!</Text>
          <Text style={styles.orderConfirmedText}>
            Tu orden <Text style={{ fontWeight: '800', color: colors.textPrimary }}>#{numeroOrden}</Text> ha sido confirmada y enviada a preparación inmediata en nuestra bodega de San Salvador.
          </Text>

          <View style={styles.deliveryEstimateBadge}>
            <Ionicons name="car-outline" size={16} color="#0D9488" />
            <Text style={styles.deliveryEstimateText}>
              Entrega estimada: <Text style={{ fontWeight: '800' }}>24 a 48 hrs hábiles</Text>
            </Text>
          </View>
        </View>

        {/* Tarjeta: Dirección de Entrega */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="location-outline" size={18} color="#0D9488" />
            <Text style={styles.cardSectionTitle}>Dirección de Entrega</Text>
          </View>
          <Text style={styles.addressTitle}>{direccion.titulo}</Text>
          <Text style={styles.addressSubtitle}>{direccion.direccion}</Text>

          <View style={styles.deliveryTagRow}>
            <Ionicons name="checkmark-circle" size={14} color="#0D9488" />
            <Text style={styles.deliveryTagText}>{direccion.tipoEnvio}</Text>
          </View>
        </View>

        {/* Tarjeta: Método de Pago */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="card-outline" size={18} color="#0D9488" />
            <Text style={styles.cardSectionTitle}>Método de Pago</Text>
          </View>
          <Text style={styles.paymentMethodTitle}>
            {metodoPago.tipo} •••• {metodoPago.ultimos4}
          </Text>
          <Text style={styles.paymentGatewayText}>
            Procesado de forma segura vía Pasarela Bancaria SV
          </Text>

          <View style={styles.paymentStatusRow}>
            <View style={styles.cobroAprobadoBadge}>
              <Text style={styles.cobroAprobadoText}>{metodoPago.estadoCobro || 'Cobro Aprobado'}</Text>
            </View>
            <Text style={styles.txIdText}>ID: {metodoPago.transaccionId}</Text>
          </View>
        </View>

        {/* Tarjeta: Artículos Comprados */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="bag-check-outline" size={18} color="#0D9488" />
            <Text style={styles.cardSectionTitle}>
              Artículos Comprados ({articulos.length} {articulos.length === 1 ? 'item' : 'items'})
            </Text>
          </View>

          {articulos.map((item, index) => {
            const priceFormatted = Number(item.precio || 0).toLocaleString('es-ES', { minimumFractionDigits: 2 });
            return (
              <View key={index} style={styles.purchasedItemRow}>
                <View style={styles.itemImageContainer}>
                  {item.imagen ? (
                    <Image source={{ uri: item.imagen }} style={styles.itemImage} />
                  ) : (
                    <Ionicons name="phone-portrait-outline" size={28} color="#CBD5E1" />
                  )}
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.itemTitle} numberOfLines={1}>{item.nombre}</Text>
                    <Text style={styles.itemPrice}>${priceFormatted}</Text>
                  </View>
                  <Text style={styles.itemMeta}>
                    Color: {item.color || 'Estándar'} • {item.condicion || 'Excelente Estado'}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <Text style={styles.itemQuantity}>Cant: {item.cantidad || 1}</Text>
                    <Text style={styles.warrantyText}>{item.garantia || 'Garantía 12 meses'}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Tarjeta: Resumen del Pedido */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Resumen del pedido</Text>

          <View style={styles.summaryLine}>
            <Text style={styles.summaryLineLabel}>Subtotal</Text>
            <Text style={styles.summaryLineValue}>${formattedSubtotal}</Text>
          </View>

          <View style={styles.summaryLine}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={styles.summaryLineLabel}>Envío Express a Domicilio</Text>
              <Ionicons name="car-outline" size={14} color="#0D9488" />
            </View>
            <Text style={[styles.summaryLineValue, { color: '#0D9488' }]}>Gratis ($0.00)</Text>
          </View>

          <View style={styles.summaryLine}>
            <Text style={styles.summaryLineLabel}>IVA (13% El Salvador)</Text>
            <Text style={styles.summaryLineValue}>Incluido en total</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total Pagado</Text>
              <Text style={styles.totalSubNotice}>Factura Electrónica enviada al correo</Text>
            </View>
            <Text style={styles.totalValue}>${formattedTotal} USD</Text>
          </View>
        </View>

        {/* Botones de Acción */}
        <TouchableOpacity
          style={styles.goToOrdersBtn}
          onPress={onGoToOrders}
          activeOpacity={0.85}
        >
          <Ionicons name="receipt-outline" size={18} color="#FFFFFF" />
          <Text style={styles.goToOrdersBtnText}>Ver en Mis Pedidos</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueShoppingBtn}
          onPress={onContinueShopping}
          activeOpacity={0.85}
        >
          <Ionicons name="bag-outline" size={18} color={colors.primary} />
          <Text style={styles.continueShoppingBtnText}>Seguir comprando</Text>
        </TouchableOpacity>

        {/* Soporte WhatsApp */}
        <View style={styles.whatsappFooter}>
          <Ionicons name="logo-whatsapp" size={16} color="#10B981" />
          <Text style={styles.whatsappText}>
            ¿Dudas con tu orden? Soporte WhatsApp:{' '}
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>+503 2222-0000</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0F2544',
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
  headerTitle: {
    fontSize: fontSize.md + 1,
    fontWeight: '800',
    color: '#FFFFFF',
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
    paddingBottom: 40,
  },
  successBanner: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 1,
    marginBottom: 4,
  },
  thanksTitle: {
    fontSize: fontSize.lg + 2,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  orderConfirmedText: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  deliveryEstimateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  deliveryEstimateText: {
    fontSize: 11,
    color: '#0F766E',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  cardSectionTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addressTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  addressSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  deliveryTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryTagText: {
    fontSize: 11,
    color: '#0D9488',
    fontWeight: '600',
  },
  paymentMethodTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  paymentGatewayText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  paymentStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cobroAprobadoBadge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  cobroAprobadoText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F766E',
  },
  txIdText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  purchasedItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  itemImageContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  itemPrice: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  itemMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemQuantity: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  warrantyText: {
    fontSize: 10,
    color: '#0D9488',
    fontWeight: '600',
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLineLabel: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
  },
  summaryLineValue: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: fontSize.sm + 1,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  totalSubNotice: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  totalValue: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  goToOrdersBtn: {
    backgroundColor: '#0F2544',
    borderRadius: borderRadius.md,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    ...shadows.button,
  },
  goToOrdersBtnText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
  },
  continueShoppingBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  continueShoppingBtnText: {
    color: colors.primary,
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
  },
  whatsappFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 10,
  },
  whatsappText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});

export default CheckoutSuccessScreen;
