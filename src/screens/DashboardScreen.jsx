import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { Ionicons } from '@expo/vector-icons';
import { dashboardStyles as styles } from '../styles/dashboardStyles';
import { colors } from '../styles/theme';
import usePhones from '../hooks/usePhones';
import ProfileScreen from './ProfileScreen';
import PersonalInfoScreen from './PersonalInfoScreen';
import CartScreen from './CartScreen';
import CheckoutPaymentScreen from './CheckoutPaymentScreen';
import CheckoutSuccessScreen from './CheckoutSuccessScreen';
import OrdersScreen from './OrdersScreen';

// ─── Colores por marca (dot en chip de filtro) ────────────────────────────────
const BRAND_COLORS = {
  apple: '#000000',
  iphone: '#000000',
  samsung: '#1428A0',
  google: '#4285F4',
  xiaomi: '#FF6900',
  motorola: '#3B7BDD',
  oneplus: '#F5010C',
  sony: '#003087',
  lg: '#A50034',
};

const getBrandColor = (brand = '') => {
  const key = brand.toLowerCase();
  for (const [k, v] of Object.entries(BRAND_COLORS)) {
    if (key.includes(k)) return v;
  }
  return colors.textSecondary;
};

// ─── Badge de condición ───────────────────────────────────────────────────────
const ConditionBadge = ({ value }) => {
  const label = (value || '').toLowerCase();
  let badgeStyle = styles.badgeDefault;
  let textStyle = styles.badgeTextDefault;

  if (label.includes('excel') || label.includes('nuevo')) {
    badgeStyle = styles.badgeExcelente;
    textStyle = styles.badgeText;
  } else if (label.includes('buen') || label.includes('usado')) {
    badgeStyle = styles.badgeBueno;
    textStyle = styles.badgeTextBueno;
  }

  if (!value) return null;
  return (
    <View style={styles.badgeRow}>
      <View style={[styles.badge, badgeStyle]}>
        <Text style={textStyle}>{value}</Text>
      </View>
    </View>
  );
};

// ─── Tarjeta de celular ───────────────────────────────────────────────────────
const PhoneCard = ({ item, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);

  const name = item.nombre || item.name || item.modelo || 'Sin nombre';
  const brand = item.marca || item.brand || '';
  const price = item.precio || item.price || 0;
  const imageUrl = item.imagen || item.image || item.foto || item.imageUrl || null;
  const condition = item.condicion || item.estado || item.condition || '';

  const formattedPrice = typeof price === 'number'
    ? `${price.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
    : price;

  return (
    <View style={styles.card}>
      {/* Imagen */}
      <View style={styles.cardImageContainer}>
        {imageUrl && !imgError ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.cardImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Ionicons name="phone-portrait-outline" size={40} color="#CBD5E1" />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.cardBody}>
        {brand ? <Text style={styles.cardBrand}>{brand}</Text> : null}
        <Text style={styles.cardName} numberOfLines={2}>{name}</Text>

        <View style={styles.cardPriceRow}>
          <Text style={styles.cardPrice}>{formattedPrice}</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => onAddToCart(item)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ConditionBadge value={condition} />
      </View>
    </View>
  );
};

// ─── Chip de filtro ───────────────────────────────────────────────────────────
const FilterChip = ({ label, active, onPress }) => {
  const dotColor = label === 'Todos' ? colors.primary : getBrandColor(label);
  return (
    <TouchableOpacity
      style={[styles.filterChip, active && styles.filterChipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {label !== 'Todos' && (
        <View style={[styles.filterDot, { backgroundColor: active ? '#FFFFFF88' : dotColor }]} />
      )}
      <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ─── Pantalla principal: DashboardScreen ─────────────────────────────────────
const DashboardScreen = ({ currentUser, onLogout }) => {
  const {
    filteredPhones,
    loading,
    error,
    fetchPhones,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filters,
  } = usePhones();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');
  // Navegación interna: 'catalog' | 'profile' | 'personalInfo' | 'cart'
  const [currentScreen, setCurrentScreen] = useState('catalog');

  // Estado del carrito y orden completada
  const [cart, setCart] = useState([]);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Navegación con animación
  const navigateWithAnimation = (screen, tab) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (screen) setCurrentScreen(screen);
    if (tab) setActiveTab(tab);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPhones();
    setRefreshing(false);
  }, [fetchPhones]);

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        c => (c.id || c._id || c.idCelular) === (item.id || item._id || item.idCelular)
      );
      if (existingItem) {
        return prevCart.map(c => 
          (c.id || c._id || c.idCelular) === (item.id || item._id || item.idCelular)
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    // Opcional: Mostrar feedback o navegar
    Alert.alert('Agregado', 'Producto añadido al carrito.');
  };

  const handleUpdateQuantity = (item, delta) => {
    setCart(prevCart => prevCart.map(c => {
      if ((c.id || c._id || c.idCelular) === (item.id || item._id || item.idCelular)) {
        const newQuantity = c.quantity + delta;
        return { ...c, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return c;
    }));
  };

  const handleRemoveItem = (item) => {
    setCart(prevCart => prevCart.filter(
      c => (c.id || c._id || c.idCelular) !== (item.id || item._id || item.idCelular)
    ));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const userInitial = (currentUser?.nombre || currentUser?.name || 'U').charAt(0).toUpperCase();

  // ─── Render item de la grid ────────────────────────────────────────────────
  const renderPhone = ({ item }) => (
    <PhoneCard item={item} onAddToCart={handleAddToCart} />
  );

  // ─── Header de la sección catálogo ────────────────────────────────────────
  const CatalogHeader = () => (
    <View style={styles.catalogHeader}>
      <View>
        <Text style={styles.catalogTitle}>
          CATÁLOGO{' '}
          <Text style={styles.catalogCount}>({filteredPhones.length})</Text>
        </Text>
      </View>
      <View style={styles.catalogActions}>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={13} color={colors.textSecondary} />
          <Text style={styles.filterBtnText}>Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortBtn} activeOpacity={0.7}>
          <Text style={styles.sortBtnText}>Destacados</Text>
          <Ionicons name="chevron-down" size={12} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ─── Renderizado según la pantalla activa ──────────────────────────────────
  const renderCurrentContent = () => {
    if (currentScreen === 'cart') {
      return (
        <CartScreen
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onBack={() => navigateWithAnimation('catalog', 'inicio')}
          onProceedToCheckout={() => navigateWithAnimation('checkout', 'carrito')}
        />
      );
    }

    if (currentScreen === 'checkout') {
      return (
        <CheckoutPaymentScreen
          cart={cart}
          currentUser={currentUser}
          onBack={() => navigateWithAnimation('cart', 'carrito')}
          onSuccess={(order) => {
            setCompletedOrder(order);
            setCart([]); // Vaciamos el carrito tras compra exitosa
            navigateWithAnimation('checkoutSuccess', 'carrito');
          }}
        />
      );
    }

    if (currentScreen === 'checkoutSuccess') {
      return (
        <CheckoutSuccessScreen
          order={completedOrder}
          onGoToOrders={() => navigateWithAnimation('orders', 'pedidos')}
          onContinueShopping={() => navigateWithAnimation('catalog', 'inicio')}
        />
      );
    }

    if (currentScreen === 'orders') {
      return (
        <OrdersScreen
          currentUser={currentUser}
          onBack={() => navigateWithAnimation('catalog', 'inicio')}
          onExploreCatalog={() => navigateWithAnimation('catalog', 'inicio')}
          onBuyAgain={(item) => {
            handleAddToCart(item);
            navigateWithAnimation('cart', 'carrito');
          }}
        />
      );
    }

    if (currentScreen === 'profile') {
      return (
        <ProfileScreen
          currentUser={currentUser}
          onLogout={onLogout}
          onNavigate={(screen) => navigateWithAnimation(screen)}
          onBack={() => navigateWithAnimation('catalog', 'inicio')}
        />
      );
    }

    if (currentScreen === 'personalInfo') {
      return (
        <PersonalInfoScreen
          currentUser={currentUser}
          onBack={() => navigateWithAnimation('profile', 'perfil')}
        />
      );
    }

    // ─── Estado: Loading ───
    if (loading && filteredPhones.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <HeaderSection
            userInitial={userInitial}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Cargando catálogo...</Text>
          </View>
        </View>
      );
    }

    // ─── Estado: Error ───
    if (error && filteredPhones.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <HeaderSection
            userInitial={userInitial}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <View style={styles.centered}>
            <Ionicons name="cloud-offline-outline" size={56} color="#CBD5E1" />
            <Text style={styles.errorTitle}>Sin conexión al servidor</Text>
            <Text style={styles.errorSubtitle}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchPhones} activeOpacity={0.85}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // ─── Vista de Catálogo (Inicio) ───
    return (
      <View style={{ flex: 1 }}>
        <HeaderSection
          userInitial={userInitial}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <FlatList
          data={filteredPhones}
          renderItem={renderPhone}
          keyExtractor={(item, index) =>
            (item.id || item._id || item.idCelular || index).toString()
          }
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.grid}
          ListHeaderComponent={<CatalogHeader />}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Ionicons name="search-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>No se encontraron celulares</Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  // ─── Vista principal con BottomTabBar persistente ─────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {renderCurrentContent()}
      </View>

      <BottomTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigate={(s, t) => navigateWithAnimation(s, t)}
        cartCount={cartCount}
      />
    </SafeAreaView>
  );
};

// ─── Header con logo, búsqueda y filtros ─────────────────────────────────────
const HeaderSection = ({
  userInitial,
  searchQuery,
  setSearchQuery,
  filters,
  activeFilter,
  setActiveFilter,
}) => (
  <View style={styles.header}>
    {/* Logo + íconos */}
    <View style={styles.headerTop}>
      <View style={styles.logoRow}>
        <View style={styles.logoIcon}>
          <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.logoText}>TRUSTPHONE</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.8}>
          <Text style={styles.avatarInitial}>{userInitial}</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Búsqueda */}
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={18} color={colors.textSecondary} />
      <TextInput
        style={styles.searchInput}
        placeholder="Busca por iPhone 15, Galaxy S24..."
        placeholderTextColor={colors.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>

    {/* Chips de filtro */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersScroll}
      contentContainerStyle={styles.filtersContent}
    >
      {filters.map((f) => (
        <FilterChip
          key={f}
          label={f}
          active={activeFilter === f}
          onPress={() => setActiveFilter(f)}
        />
      ))}
    </ScrollView>
  </View>
);

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
const TAB_ITEMS = [
  { key: 'inicio', label: 'Inicio', icon: 'home', iconActive: 'home' },
  { key: 'carrito', label: 'Carrito', icon: 'bag-outline', iconActive: 'bag' },
  { key: 'pedidos', label: 'Pedidos', icon: 'receipt-outline', iconActive: 'receipt' },
  { key: 'perfil', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

const BottomTabBar = ({ activeTab, setActiveTab, onNavigate, cartCount = 0 }) => (
  <View style={styles.tabBar}>
    {TAB_ITEMS.map((tab) => {
      const isActive = activeTab === tab.key;
      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => {
            if (tab.key === 'perfil') {
              onNavigate('profile', 'perfil');
            } else if (tab.key === 'carrito') {
              onNavigate('cart', 'carrito');
            } else if (tab.key === 'pedidos') {
              onNavigate('orders', 'pedidos');
            } else if (tab.key === 'inicio') {
              onNavigate('catalog', 'inicio');
            } else {
              onNavigate(null, tab.key);
            }
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.tabIconContainer, isActive && styles.tabIconBg]}>
            <Ionicons
              name={isActive ? tab.iconActive : tab.icon}
              size={22}
              color={isActive ? colors.primary : colors.textSecondary}
            />
            {tab.key === 'carrito' && cartCount > 0 && (
              <View style={{
                position: 'absolute',
                top: -4,
                right: -6,
                backgroundColor: colors.error,
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 4,
              }}>
                <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>{cartCount}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default DashboardScreen;
