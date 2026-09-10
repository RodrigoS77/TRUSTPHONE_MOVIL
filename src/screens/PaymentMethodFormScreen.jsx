import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { paymentStyles as styles } from '../styles/paymentStyles';
import { colors } from '../styles/theme';
import useCustomData from '../hooks/useCustomData';

const FormInputField = ({
  label,
  value,
  onChangeText,
  icon,
  placeholder,
  keyboardType = 'default',
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldInputRow, isFocused && styles.fieldInputRowFocused]}>
        <Ionicons
          name={icon}
          size={18}
          color={isFocused ? colors.primary : colors.textSecondary}
        />
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

const PaymentMethodFormScreen = ({ currentUser, onBack, onSaveSuccess }) => {
  const { createMetodoPago } = useCustomData();

  const clienteId = currentUser?._id || currentUser?.id || null;

  const [tipo, setTipo] = useState('Tarjeta de Débito');
  const [titular, setTitular] = useState(
    currentUser?.nombre ? `${currentUser.nombre} ${currentUser.Apellido || currentUser.apellido || ''}`.trim() : ''
  );
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [banco, setBanco] = useState('Banco Agrícola');
  const [esPredeterminado, setEsPredeterminado] = useState(true);
  const [saving, setSaving] = useState(false);

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  // Formatear fecha de vencimiento MM/AA
  const handleExpiryChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  // Detección automática de marca
  const detectBrand = () => {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (clean.startsWith('5')) return 'MasterCard';
    if (clean.startsWith('3')) return 'American Express';
    return 'VISA';
  };

  const currentBrand = detectBrand();

  const handleSave = async () => {
    if (!clienteId) {
      Alert.alert('Error', 'Debes iniciar sesión para registrar un método de pago.');
      return;
    }

    if (!titular.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre del titular de la tarjeta.');
      return;
    }

    const cleanCardNumber = cardNumber.replace(/\D/g, '');
    if (cleanCardNumber.length < 15) {
      Alert.alert('Tarjeta inválida', 'Por favor ingresa un número de tarjeta válido (15 o 16 dígitos).');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      Alert.alert('Fecha inválida', 'La fecha de vencimiento debe tener formato MM/AA (ej. 08/28).');
      return;
    }

    setSaving(true);

    const payload = {
      cliente: clienteId,
      tipo,
      titular: titular.trim(),
      marca: currentBrand,
      ultimos4: cleanCardNumber.slice(-4),
      fechaExpiracion: expiry.trim(),
      banco: banco.trim(),
      esPredeterminado,
    };

    try {
      const res = await createMetodoPago(payload);
      setSaving(false);

      if (res.success) {
        Alert.alert('Éxito', 'Tarjeta registrada correctamente.', [
          {
            text: 'OK',
            onPress: () => {
              if (onSaveSuccess) onSaveSuccess(res.metodoPago);
              else if (onBack) onBack();
            },
          },
        ]);
      } else {
        Alert.alert('Error', res.error || 'No se pudo guardar la tarjeta.');
      }
    } catch (e) {
      setSaving(false);
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    }
  };

  const bancosComunes = ['Banco Agrícola', 'BAC Credomatic', 'Banco Cuscatlán', 'Davivienda', 'Promerica'];

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
          <Text style={styles.headerTitle}>Agregar Tarjeta</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.formScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ─── Tarjeta Visual Interactiva en Vivo ─── */}
          <View style={[styles.visualCard, currentBrand !== 'VISA' && styles.visualCardGold]}>
            <View style={styles.visualCardBgCircle1} />
            <View style={styles.visualCardBgCircle2} />

            <View style={styles.visualCardTop}>
              <View style={styles.chipAndWifiRow}>
                <View style={styles.chipBox}>
                  <View style={styles.chipInnerLines} />
                </View>
                <Ionicons name="wifi" size={18} color="rgba(255,255,255,0.7)" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={styles.typeTag}>
                  <Text style={styles.typeTagText}>
                    {tipo === 'Tarjeta de Crédito' ? 'CRÉDITO' : 'DÉBITO'}
                  </Text>
                </View>
                <Text style={styles.brandBadgeText}>{currentBrand}</Text>
              </View>
            </View>

            <Text style={styles.visualCardNumber}>
              {cardNumber || '••••  ••••  ••••  ••••'}
            </Text>

            <View style={styles.visualCardBottom}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.cardLabelSmall}>TITULAR</Text>
                <Text style={styles.cardValueText} numberOfLines={1}>
                  {titular ? titular.toUpperCase() : 'NOMBRE Y APELLIDO'}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.cardLabelSmall}>VENCE</Text>
                <Text style={styles.cardValueText}>
                  {expiry || 'MM/AA'}
                </Text>
              </View>
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.formCard}>
            <Text style={styles.formSectionTitle}>Tipo de Tarjeta</Text>
            <View style={styles.typeChipsRow}>
              {['Tarjeta de Débito', 'Tarjeta de Crédito'].map((t) => {
                const isActive = tipo === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[styles.typeChip, isActive && styles.typeChipActive]}
                    onPress={() => setTipo(t)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="card-outline"
                      size={16}
                      color={isActive ? colors.primary : colors.textSecondary}
                    />
                    <Text style={[styles.typeChipText, isActive && styles.typeChipTextActive]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.formSectionTitle}>Datos de la Tarjeta</Text>
            <FormInputField
              label="Nombre del titular *"
              value={titular}
              onChangeText={setTitular}
              icon="person-outline"
              placeholder="Como figura en la tarjeta"
            />

            <FormInputField
              label="Número de tarjeta *"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              icon="card-outline"
              placeholder="4000 1234 5678 9010"
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={styles.fieldRowTwo}>
              <View style={{ flex: 1 }}>
                <FormInputField
                  label="Vencimiento *"
                  value={expiry}
                  onChangeText={handleExpiryChange}
                  icon="calendar-outline"
                  placeholder="MM/AA"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInputField
                  label="Banco emisor"
                  value={banco}
                  onChangeText={setBanco}
                  icon="business-outline"
                  placeholder="Ej: BAC Credomatic"
                />
              </View>
            </View>

            {/* Chips rápidos de bancos */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {bancosComunes.map((b) => (
                  <TouchableOpacity
                    key={b}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 14,
                      backgroundColor: banco === b ? '#EFF6FF' : '#F1F5F9',
                      borderWidth: 1,
                      borderColor: banco === b ? colors.primary : '#E2E8F0',
                    }}
                    onPress={() => setBanco(b)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '600', color: banco === b ? colors.primary : colors.textSecondary }}>
                      {b}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Switch Predeterminada */}
            <View style={styles.defaultSwitchRow}>
              <View style={styles.defaultSwitchLabelRow}>
                <Ionicons
                  name={esPredeterminado ? 'star' : 'star-outline'}
                  size={20}
                  color={esPredeterminado ? '#F59E0B' : colors.textSecondary}
                />
                <Text style={styles.defaultSwitchLabel}>
                  Establecer como tarjeta principal
                </Text>
              </View>
              <Switch
                value={esPredeterminado}
                onValueChange={setEsPredeterminado}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={esPredeterminado ? colors.primary : '#F1F5F9'}
              />
            </View>
          </View>

          {/* Aviso de seguridad PCI-DSS */}
          <View style={styles.securityCard}>
            <Ionicons name="shield-checkmark" size={20} color="#15803D" />
            <Text style={styles.securityText}>
              Aviso de Seguridad: Por normativas PCI-DSS, nunca guardamos tu código CVV/CVC ni el número completo en nuestros servidores.
            </Text>
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity
            style={[styles.saveBtn, saving && { opacity: 0.7 }]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.85}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveBtnText}>Guardar Tarjeta</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PaymentMethodFormScreen;
