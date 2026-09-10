import { StyleSheet } from 'react-native';
import { colors, fontSize, borderRadius, spacing, shadows } from './theme';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    ...shadows.card,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  // Header Logo Component Styles
  appName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    letterSpacing: -0.3,
  },
  logoImage: {
    width: 180,
    height: 180,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
    lineHeight: 20,
  },
  // Form Styles
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  forgotText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },
  inputFocused: {
    borderColor: colors.borderFocused,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputIconLeft: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: fontSize.sm + 1,
    color: colors.textPrimary,
  },
  eyeIcon: {
    padding: spacing.xs,
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: 2,
  },
  // Button Component Styles
  primaryButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    ...shadows.button,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  // Divider Component Styles
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.dividerLine,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.xs - 1,
    fontWeight: '600',
    color: colors.dividerText,
    letterSpacing: 0.8,
  },
  // Social Component Styles
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    marginBottom: spacing.xl,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderWidth: 1,
    borderColor: colors.socialBorder,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.socialBg,
    gap: spacing.sm,
  },
  socialText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.socialText,
  },
  // Footer Link Styles
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginTop: spacing.xl,
    alignSelf: 'center',
  },
  // API Status Badge
  apiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  apiBadgeText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  apiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  // Profile Dashboard Card
  profileCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  profileTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  profileSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  profileLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  profileValue: {
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

