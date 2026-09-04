import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontSize, borderRadius, spacing, shadows } from './theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const dashboardStyles = StyleSheet.create({
  // ─── Container Principal ───────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // ─── Header ───────────────────────────────────────────────────────────────
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: spacing.md,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    ...shadows.card,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  logoText: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  avatarInitial: {
    color: '#FFF',
    fontSize: fontSize.sm,
    fontWeight: '700',
  },

  // ─── Search Bar ───────────────────────────────────────────────────────────
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    height: '100%',
  },

  // ─── Filter Chips ─────────────────────────────────────────────────────────
  filtersScroll: {
    marginBottom: 4,
  },
  filtersContent: {
    paddingHorizontal: 0,
    gap: 8,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  // ─── Catalog Section ──────────────────────────────────────────────────────
  catalogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  catalogTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  catalogCount: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  catalogActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  filterBtnText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  sortBtnText: {
    fontSize: fontSize.xs + 1,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // ─── Grid ─────────────────────────────────────────────────────────────────
  grid: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // ─── Phone Card ───────────────────────────────────────────────────────────
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...shadows.card,
  },
  cardImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  cardBody: {
    padding: 10,
  },
  cardBrand: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  cardName: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  badgeRow: {
    marginTop: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeExcelente: {
    backgroundColor: '#D1FAE5',
  },
  badgeBueno: {
    backgroundColor: '#DBEAFE',
  },
  badgeDefault: {
    backgroundColor: '#F1F5F9',
  },
  badgeText: {
    fontSize: fontSize.xs - 1,
    fontWeight: '700',
    color: '#065F46',
  },
  badgeTextBueno: {
    color: '#1D4ED8',
  },
  badgeTextDefault: {
    color: colors.textSecondary,
  },

  // ─── Estados: loading, error, vacío ───────────────────────────────────────
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  errorSubtitle: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    ...shadows.button,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },

  // ─── Bottom Tab Bar ───────────────────────────────────────────────────────
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: spacing.sm,
    ...shadows.card,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabIconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconBg: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 4,
  },
});
