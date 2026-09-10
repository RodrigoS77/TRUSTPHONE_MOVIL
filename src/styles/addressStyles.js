import { StyleSheet, Platform } from 'react-native';
import { colors, fontSize, borderRadius, spacing, shadows } from './theme';

export const addressStyles = StyleSheet.create({

  // ─── Contenedor base ──────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ─── Header azul ──────────────────────────────────────────────────────────
  headerBg: {
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.md + 1,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  headerPlaceholder: {
    width: 36,
  },

  // ─── Contenido desplazable ────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 100,
  },

  // ─── Contador de direcciones ──────────────────────────────────────────────
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  countText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // ─── Tarjeta de dirección ─────────────────────────────────────────────────
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
  },
  addressCardPrincipal: {
    borderColor: '#BBF7D0',
    borderWidth: 1.5,
  },
  addressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  addressIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  principalBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  principalBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
  },
  addressBodyText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  addressPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 10,
  },
  addressPhoneText: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
  },
  addressActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  actionBtnText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  deleteBtnText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: '#EF4444',
  },

  // ─── Estado vacío ─────────────────────────────────────────────────────────
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  // ─── Botón agregar (fijo abajo) ───────────────────────────────────────────
  addBtnContainer: {
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
  addBtn: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...shadows.button,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FORMULARIO DE DIRECCIÓN
  // ─────────────────────────────────────────────────────────────────────────

  formScrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 40,
  },

  // Tarjeta del formulario
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
    marginBottom: spacing.md,
  },
  formSectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  // Selector de etiqueta
  labelSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  labelChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  labelChipActive: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.primary,
  },
  labelChipText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelChipTextActive: {
    color: colors.primary,
  },

  // Campos de formulario
  fieldGroup: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  fieldInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#F8FAFC',
    gap: 10,
  },
  fieldInputRowFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  fieldInput: {
    flex: 1,
    fontSize: fontSize.sm + 1,
    color: colors.textPrimary,
    height: '100%',
  },
  fieldRowTwo: {
    flexDirection: 'row',
    gap: 10,
  },

  // Switch principal
  principalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginTop: 4,
  },
  principalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  principalLabel: {
    fontSize: fontSize.sm + 1,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Botón Guardar
  saveBtn: {
    marginTop: 8,
    marginBottom: 30,
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SECCIÓN DE DIRECCIÓN EN CHECKOUT
  // ─────────────────────────────────────────────────────────────────────────

  checkoutAddressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  checkoutAddressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutAddressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutAddressTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  checkoutChangeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
  },
  checkoutChangeBtnText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutAddressBody: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.sm,
    padding: 12,
  },
  checkoutAddressName: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  checkoutAddressText: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  checkoutAddressSelector: {
    marginTop: 10,
  },
  checkoutAddressOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#F8FAFC',
    gap: 10,
  },
  checkoutAddressOptionSelected: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  checkoutAddressOptionText: {
    flex: 1,
    fontSize: fontSize.xs + 1,
    color: colors.textPrimary,
  },
  checkoutAddNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  checkoutAddNewBtnText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.primary,
  },
  noAddressContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  noAddressText: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
    marginBottom: 10,
  },
});
