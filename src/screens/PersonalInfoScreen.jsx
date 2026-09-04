import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, spacing, borderRadius, shadows } from '../styles/theme';

// ─── Campo de formulario ──────────────────────────────────────────────────────
const FormField = ({ label, value, onChangeText, icon, placeholder, keyboardType }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={s.fieldGroup}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={[s.fieldRow, focused && s.fieldRowFocused]}>
        <Ionicons name={icon} size={18} color={focused ? colors.primary : colors.textSecondary} />
        <TextInput
          style={s.fieldInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType={keyboardType || 'default'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
};

// ─── Pantalla Información Personal ───────────────────────────────────────────
const PersonalInfoScreen = ({ currentUser, onBack }) => {
  const [imgError, setImgError] = useState(false);
  const [saving, setSaving] = useState(false);

  const getProp = (obj, keys) => {
    if (!obj) return null;
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
    }
    return null;
  };

  const rawNombre = getProp(currentUser, ['nombre', 'Nombre', 'name', 'Name', 'nombreCompleto', 'nombre_completo']) || '';
  const rawApellido = getProp(currentUser, ['apellido', 'Apellido', 'lastName', 'last_name']) || '';

  const fullCombinedName = (() => {
    if (rawNombre && rawApellido && !rawNombre.toLowerCase().includes(rawApellido.toLowerCase())) {
      return `${rawNombre} ${rawApellido}`.trim();
    }
    return rawNombre || rawApellido || '';
  })();

  const [nombre, setNombre] = useState(fullCombinedName);
  const [correo, setCorreo] = useState(
    getProp(currentUser, ['correo', 'Correo', 'email', 'Email', 'mail']) || ''
  );
  const [telefono, setTelefono] = useState(
    getProp(currentUser, ['telefono', 'Telefono', 'phone', 'Phone', 'celular', 'Celular', 'telefono_cliente']) || ''
  );
  const [fechaNacimiento, setFechaNacimiento] = useState(
    getProp(currentUser, ['fechaNacimiento', 'fecha_nacimiento', 'birthDate', 'birth_date', 'nacimiento']) || ''
  );

  const photoUrl = getProp(currentUser, ['fotoPerfil', 'foto_perfil', 'foto', 'Foto', 'photo', 'Photo', 'avatar', 'imagen']);
  const hasPhoto = photoUrl && !imgError && !photoUrl.includes('placeholder');
  const initial = (nombre || 'R').charAt(0).toUpperCase();

  const handleSave = () => {
    if (!nombre.trim()) {
      Alert.alert('Campo requerido', 'El nombre completo es obligatorio.', [{ text: 'OK' }]);
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('✓ Guardado', 'Tu información ha sido actualizada.', [
        { text: 'OK', onPress: onBack },
      ]);
    }, 800);
  };

  return (
    <View style={[s.safe, { flex: 1 }]}>

      {/* ── 1. HEADER AZUL ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Información Personal</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── 2. AVATAR — entre header y scroll, marginTop negativo ── */}
      <View style={s.avatarSection}>
        <View style={s.avatarRing}>
          {hasPhoto ? (
            <Image
              source={{ uri: photoUrl }}
              style={s.avatarImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <Text style={s.avatarInitial}>{initial}</Text>
          )}
        </View>
        <TouchableOpacity style={s.editPhotoBtn} activeOpacity={0.8}>
          <Ionicons name="pencil" size={13} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* ── 3. SCROLL con el formulario ── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.formCard}>
          <FormField
            label="Nombre Completo"
            value={nombre}
            onChangeText={setNombre}
            icon="person-outline"
            placeholder="Tu nombre completo"
          />
          <FormField
            label="Correo Electrónico"
            value={correo}
            onChangeText={setCorreo}
            icon="mail-outline"
            placeholder="tu@correo.com"
            keyboardType="email-address"
          />
          <FormField
            label="Número de Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            icon="call-outline"
            placeholder="+503 0000-0000"
            keyboardType="phone-pad"
          />
          <FormField
            label="Fecha de Nacimiento"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            icon="calendar-outline"
            placeholder="DD/MM/AAAA"
          />
        </View>

        <TouchableOpacity
          style={[s.saveBtn, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={saving}
        >
          <Text style={s.saveBtnText}>{saving ? 'Guardando...' : 'Guardar Cambios'}</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
};

// ─── Estilos inline para máximo control del layout ────────────────────────────
const AVATAR_SIZE = 90;

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Header azul compacto
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: AVATAR_SIZE / 2 + 12, // deja espacio para que el avatar sobresalga
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },

  // Avatar centrado, overlap entre header y scroll
  avatarSection: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2 + 12), // sube exactamente el mismo valor que el paddingBottom del header
    marginBottom: 12,
    zIndex: 20,
  },
  avatarRing: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
  },
  editPhotoBtn: {
    position: 'absolute',
    bottom: 4,
    right: '50%',
    marginRight: -(AVATAR_SIZE / 2) + 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    elevation: 4,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Tarjeta de formulario
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  // Campo
  fieldGroup: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#F8FAFC',
    gap: 10,
  },
  fieldRowFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    backgroundColor: '#FFF',
  },
  fieldInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    height: '100%',
  },

  // Botón guardar
  saveBtn: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PersonalInfoScreen;
