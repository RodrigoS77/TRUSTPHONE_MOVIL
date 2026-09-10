import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, borderRadius, spacing, shadows } from '../styles/theme';
import useOrders from '../hooks/useOrders';

const STATUS_TABS = ['Todos', 'En camino', 'Procesando', 'Entregado'];

export const OrdersScreen = ({
  currentUser,
  onBack,
  onExploreCatalog,
  onBuyAgain,
}) => {
  const {
    filteredOrders,
    loading,
    refreshing,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    searchVisible,
    setSearchVisible,
    onRefresh,
    handleCancelOrder,
    handleTrackOrder,
    handleViewInvoice,
  } = useOrders(currentUser);

  // Renderizar cada tarjeta de pedido
  const renderOrderItem = ({ item: order }) => {
    const firstArticle = order.articulos?.[0] || {};
    const articleTitle = order.articulos?.length > 1
      ? `${firstArticle.nombre} (+${order.articulos.length - 1} más)`
      : (firstArticle.nombre || 'Celular Trustphone');

    const formattedPrice = Number(order.totales?.total || 0).toLocaleString('es-ES', { minimumFractionDigits: 2 });
    const orderDate = order.fechaOrden
      ? new Date(order.fechaOrden).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Reciente';

    // Determinar estilo de badge según estado
    const estado = order.estado || 'Procesando';
    let badgeStyle = styles.badgeProcesando;
    let badgeTextStyle = styles.badgeTextProcesando;

    if (estado === 'En camino') {
      badgeStyle = styles.badgeEnCamino;
      badgeTextStyle = styles.badgeTextEnCamino;
    } else if (estado === 'Entregado') {
      badgeStyle = styles.badgeEntregado;
      badgeTextStyle = styles.badgeTextEntregado;
    } else if (estado === 'Cancelado') {
      badgeStyle = styles.badgeCancelado;
      badgeTextStyle = styles.badgeTextCancelado;
    }

    return (
      <View style={styles.orderCard}>
        {/* Encabezado de la tarjeta: Estado + Precio */}
        <View style={styles.orderCardHeader}>
          <View style={[styles.statusBadge, badgeStyle]}>
            <Text style={[styles.statusBadgeText, badgeTextStyle]}>
              {estado.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.orderPrice}>${formattedPrice}</Text>
        </View>

        {/* Título de producto y código de orden */}
        <Text style={styles.orderProductTitle} numberOfLines={1}>{articleTitle}</Text>
        <Text style={styles.orderMetaText}>
          #{order.numeroOrden} • {orderDate}
        </Text>

        {/* Fila con imagen y estado de preparación / entrega */}
        <View style={styles.orderBodyRow}>
          <View style={styles.productThumbnail}>
            {firstArticle.imagen ? (
              <Image source={{ uri: firstArticle.imagen }} style={styles.thumbnailImage} />
            ) : (
              <Ionicons name="phone-portrait-outline" size={32} color="#CBD5E1" />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            {estado === 'En camino' && (
              <View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '65%' }]} />
                </View>
                <Text style={styles.statusDescription}>
                  {order.estadoMensaje || `Llegará el ${order.fechaEstimada || 'próximamente'}`}
                </Text>
              </View>
            )}

            {estado === 'Entregado' && (
              <Text style={styles.statusDescription}>
                {order.estadoMensaje || 'Entregado en recepción / domicilio'}
              </Text>
            )}

            {estado === 'Procesando' && (
              <Text style={styles.statusDescription}>
                {order.estadoMensaje || 'Estamos preparando tu pedido'}
              </Text>
            )}

            {estado === 'Cancelado' && (
              <Text style={[styles.statusDescription, { color: colors.error }]}>
                {order.estadoMensaje || 'Pedido cancelado'}
              </Text>
            )}
          </View>
        </View>

        {/* Botones de Acción según estado */}
        <View style={styles.actionsRow}>
          {estado === 'En camino' && (
            <TouchableOpacity
              style={styles.trackBtn}
              onPress={() => handleTrackOrder(order)}
              activeOpacity={0.8}
            >
              <Ionicons name="navigate-outline" size={14} color="#0284C7" />
              <Text style={styles.trackBtnText}>Rastrear</Text>
              <Ionicons name="chevron-forward" size={14} color="#0284C7" />
            </TouchableOpacity>
          )}

          {estado === 'Entregado' && (
            <View style={{ flexDirection: 'row', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={styles.invoiceBtn}
                onPress={() => handleViewInvoice(order)}
                activeOpacity={0.8}
              >
                <Ionicons name="receipt-outline" size={14} color={colors.textPrimary} />
                <Text style={styles.invoiceBtnText}>Ver Factura</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buyAgainBtn}
                onPress={() => onBuyAgain && onBuyAgain(firstArticle)}
                activeOpacity={0.8}
              >
                <Text style={styles.buyAgainBtnText}>Comprar de nuevo</Text>
              </TouchableOpacity>
            </View>
          )}

          {estado === 'Procesando' && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => handleCancelOrder(order)}
              activeOpacity={0.8}
            >
              <Ionicons name="close-circle-outline" size={14} color="#DC2626" />
              <Text style={styles.cancelBtnText}>Cancelar</Text>
              <Ionicons name="chevron-forward" size={14} color="#DC2626" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Dark Navy */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Pedidos</Text>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => setSearchVisible(!searchVisible)}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barra de Búsqueda opcional */}
      {searchVisible && (
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={16} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por orden #SV o modelo..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {/* Tabs Horizontales de Filtro */}
      <View style={styles.tabsContainer}>
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contenido / Lista de Pedidos */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando tus pedidos...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => (item._id || item.id || item.numeroOrden).toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={60} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No hay pedidos que mostrar</Text>
              <Text style={styles.emptySubtitle}>
                {activeTab !== 'Todos'
                  ? `No tienes pedidos con estado "${activeTab}".`
                  : 'Aún no has realizado ninguna compra en Trustphone.'}
              </Text>
              <TouchableOpacity
                style={styles.exploreBtn}
                onPress={onExploreCatalog}
                activeOpacity={0.8}
              >
                <Text style={styles.exploreBtnText}>Explorar Catálogo</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
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
    paddingBottom: 16,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.md + 2,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: spacing.md,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.xs + 1,
    color: colors.textPrimary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#0284C7',
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0284C7',
    fontWeight: '700',
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badgeEnCamino: {
    backgroundColor: '#E0F2FE',
  },
  badgeTextEnCamino: {
    color: '#0284C7',
  },
  badgeEntregado: {
    backgroundColor: '#D1FAE5',
  },
  badgeTextEntregado: {
    color: '#059669',
  },
  badgeProcesando: {
    backgroundColor: '#FEF3C7',
  },
  badgeTextProcesando: {
    color: '#D97706',
  },
  badgeCancelado: {
    backgroundColor: '#FEE2E2',
  },
  badgeTextCancelado: {
    color: '#DC2626',
  },
  orderPrice: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  orderProductTitle: {
    fontSize: fontSize.sm + 1,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  orderMetaText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  orderBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  productThumbnail: {
    width: 54,
    height: 54,
    borderRadius: borderRadius.sm,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 6,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#0284C7',
    borderRadius: 2,
  },
  statusDescription: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  trackBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
  },
  invoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  invoiceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  buyAgainBtn: {
    backgroundColor: '#0F2544',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  buyAgainBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: fontSize.xs + 1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  exploreBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
});

export default OrdersScreen;
