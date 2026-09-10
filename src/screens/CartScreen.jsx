import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cartStyles as styles } from '../styles/cartStyles';
import { colors } from '../styles/theme';

const CartScreen = ({ cart, onUpdateQuantity, onRemoveItem, onBack, onProceedToCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.precio || item.price || 0) * item.quantity, 0);
  const formattedSubtotal = subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega algún producto antes de finalizar la compra.');
      return;
    }
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  const renderItem = (cartItem) => {
    const item = cartItem; // El item entero se guardó en cart, con .quantity agregado
    const name = item.nombre || item.name || item.modelo || 'Celular';
    const price = item.precio || item.price || 0;
    const imageUrl = item.imagen || item.foto || item.imageUrl || null;
    const condition = item.condicion || item.estado || 'Excelente';
    const color = item.color || 'Estándar';
    const formattedPrice = price.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    return (
      <View key={item.id || item._id || item.idCelular} style={styles.cartItemCard}>
        <View style={styles.itemRow}>
          {/* Imagen */}
          <View style={styles.itemImageContainer}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.itemImage} />
            ) : (
              <Ionicons name="phone-portrait-outline" size={32} color="#CBD5E1" />
            )}
          </View>

          {/* Detalles */}
          <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={1}>{name}</Text>
            <View style={styles.itemMetaRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{condition}</Text>
              </View>
              <Text style={styles.itemColor}>Color: {color}</Text>
            </View>
            <Text style={styles.itemPrice}>${formattedPrice}</Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.itemActionsRow}>
          <TouchableOpacity 
            style={styles.deleteBtn} 
            onPress={() => onRemoveItem(item)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color={colors.error} />
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>

          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => onUpdateQuantity(item, -1)}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => onUpdateQuantity(item, 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tu Carrito</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
            <Text style={styles.emptySubtitle}>
              Parece que aún no has agregado ningún celular a tu carrito.
            </Text>
            <TouchableOpacity style={styles.exploreBtn} onPress={onBack} activeOpacity={0.8}>
              <Text style={styles.exploreBtnText}>Explorar catálogo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Lista de productos */}
            {cart.map(renderItem)}

            {/* Resumen */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumen del pedido</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${formattedSubtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío</Text>
                <Text style={[styles.summaryValue, styles.freeShippingText]}>Gratis</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${formattedSubtotal}</Text>
              </View>

              <TouchableOpacity 
                style={styles.checkoutBtn} 
                onPress={handleCheckout}
                activeOpacity={0.85}
              >
                <Text style={styles.checkoutBtnText}>Finalizar compra</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CartScreen;
