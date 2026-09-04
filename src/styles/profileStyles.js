import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize, borderRadius, spacing, shadows } from './theme';

const { width } = Dimensions.get('window');

export const profileStyles = StyleSheet.create({

  // ─── Contenedor base ──────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ─── Header azul curvo ────────────────────────────────────────────────────
  headerBg: {
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
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
  headerSettingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ─── Avatar / Foto de perfil ──────────────────────────────────────────────
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
  },
  avatarInitialText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  // ─── Nombre y correo bajo el avatar ──────────────────────────────────────
  profileName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: fontSize.xs + 1,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
  },

  // ─── Contenido desplazable ────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },

  // ─── Secciones (CUENTA / PREFERENCIAS) ───────────────────────────────────
  sectionLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    ...shadows.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: fontSize.sm + 1,
    fontWeight: '500',
    color: colors.textPrimary,
  },

  // ─── Botón Cerrar Sesión ──────────────────────────────────────────────────
  logoutCard: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    overflow: 'hidden',
    ...shadows.card,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: '#EF4444',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INFORMACIÓN PERSONAL
  // ─────────────────────────────────────────────────────────────────────────

  infoHeaderBg: {
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: spacing.md,
  },
  infoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoHeaderTitle: {
    fontSize: fontSize.md + 1,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Avatar flotante entre header y scroll
  infoAvatarOverlay: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingBottom: 0,
    zIndex: 10,
  },

  // Avatar en info personal con botón editar
  infoAvatarWrapper: {
    position: 'relative',
    marginBottom: 0,
    bottom: -40,
  },
  infoAvatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...shadows.card,
  },
  infoAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  infoAvatarInitial: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoEditPhotoBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  // Scroll y tarjeta
  infoScrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 40,
  },

  // Tarjeta del formulario
  infoFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
    marginBottom: spacing.md,
  },
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

  // Botón Guardar Cambios
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
});
