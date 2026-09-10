import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addressStyles as styles } from '../styles/addressStyles';
import { colors } from '../styles/theme';
import useCustomData from '../hooks/useCustomData';

const AddressesScreen = ({ currentUser, onBack, onNavigate }) => {
  const { getDirecciones, deleteDireccion } = useCustomData();
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const clienteId = currentUser?._id || currentUser?.id || null;

  const fetchDirecciones = useCallback(async () => {
    if (!clienteId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const result = await getDirecciones(clienteId);
      if (result.success) {
        setDirecciones(result.direcciones);
      }
    } catch (err) {
      console.log('Error fetching direcciones:', err);
    }
    setLoading(false);
  }, [clienteId]);

  useEffect(() => {
    fetchDirecciones();
  }, [fetchDirecciones]);

  const handleDelete = (id, titulo) => {
    Alert.alert(
      'Eliminar dirección',
      `¿Estás seguro que deseas eliminar "${titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteDireccion(id);
            if (result.success) {
              setDirecciones(prev => prev.filter(d => d._id !== id));
              Alert.alert('Listo', 'Dirección eliminada correctamente.');
            } else {
              Alert.alert('Error', result.error || 'No se pudo eliminar la dirección.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (direccion) => {
    if (onNavigate) {
      onNavigate('addressEdit', { direccion });
    }
  };

  const handleAdd = () => {
    if (onNavigate) {
      onNavigate('addressForm');
    }
  };

  const getIconForTitle = (titulo) => {
    const t = (titulo || '').toLowerCase();
    if (t.includes('casa') || t.includes('hogar')) return 'home-outline';
    if (t.includes('oficina') || t.includes('trabajo')) return 'business-outline';
    return 'location-outline';
  };

  const getIconColorForTitle = (titulo) => {
    const t = (titulo || '').toLowerCase();
    if (t.includes('casa') || t.includes('hogar')) return '#3B82F6';
    if (t.includes('oficina') || t.includes('trabajo')) return '#8B5CF6';
    return '#22C55E';
  };

  const getIconBgForTitle = (titulo) => {
    const t = (titulo || '').toLowerCase();
    if (t.includes('casa') || t.includes('hogar')) return '#EFF6FF';
    if (t.includes('oficina') || t.includes('trabajo')) return '#F5F3FF';
    return '#F0FDF4';
  };

  return (
    <View style={styles.container}>
      {/* Header azul */}
      <View style={styles.headerBg}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerBackBtn}
            onPress={onBack}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Direcciones</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 12, color: colors.textSecondary, fontSize: 14 }}>
            Cargando direcciones...
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {direcciones.length === 0 ? (
              /* Estado vacío */
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="location-outline" size={44} color="#22C55E" />
                </View>
                <Text style={styles.emptyTitle}>Sin direcciones guardadas</Text>
                <Text style={styles.emptySubtitle}>
                  Agrega tu primera dirección de envío para que tus compras lleguen más rápido.
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.countRow}>
                  <Text style={styles.countText}>
                    {direcciones.length} {direcciones.length === 1 ? 'dirección' : 'direcciones'}
                  </Text>
                </View>

                {direcciones.map((dir) => (
                  <View
                    key={dir._id}
                    style={[
                      styles.addressCard,
                      dir.esPrincipal && styles.addressCardPrincipal,
                    ]}
                  >
                    {/* Top: Ícono + Título + Badge principal */}
                    <View style={styles.addressTopRow}>
                      <View style={styles.addressTitleRow}>
                        <View style={[styles.addressIconBox, { backgroundColor: getIconBgForTitle(dir.titulo) }]}>
                          <Ionicons
                            name={getIconForTitle(dir.titulo)}
                            size={18}
                            color={getIconColorForTitle(dir.titulo)}
                          />
                        </View>
                        <Text style={styles.addressTitle}>{dir.titulo || 'Dirección'}</Text>
                      </View>
                      {dir.esPrincipal && (
                        <View style={styles.principalBadge}>
                          <Text style={styles.principalBadgeText}>Principal</Text>
                        </View>
                      )}
                    </View>

                    {/* Body: datos de la dirección */}
                    <Text style={styles.addressBodyText}>
                      {dir.nombreDestinatario}
                    </Text>
                    <Text style={styles.addressBodyText}>
                      {dir.direccion}
                      {dir.colonia ? `, ${dir.colonia}` : ''}
                    </Text>
                    <Text style={styles.addressBodyText}>
                      {dir.ciudad}, {dir.departamento}
                      {dir.codigoPostal ? ` - CP ${dir.codigoPostal}` : ''}
                    </Text>
                    {dir.referencia ? (
                      <Text style={[styles.addressBodyText, { fontStyle: 'italic' }]}>
                        Ref: {dir.referencia}
                      </Text>
                    ) : null}

                    <View style={styles.addressPhoneRow}>
                      <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
                      <Text style={styles.addressPhoneText}>{dir.telefono}</Text>
                    </View>

                    {/* Acciones: Editar / Eliminar */}
                    <View style={styles.addressActionsRow}>
                      <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => handleEdit(dir)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="create-outline" size={16} color={colors.textSecondary} />
                        <Text style={styles.actionBtnText}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => handleDelete(dir._id, dir.titulo)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                        <Text style={styles.deleteBtnText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            )}
          </ScrollView>

          {/* Botón fijo: Agregar dirección */}
          <View style={styles.addBtnContainer}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAdd}
              activeOpacity={0.85}
            >
              <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.addBtnText}>Agregar dirección</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default AddressesScreen;
