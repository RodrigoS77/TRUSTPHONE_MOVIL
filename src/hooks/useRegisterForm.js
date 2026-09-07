import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import useCustomData from './useCustomData';

export function useRegisterForm() {
  const router = useRouter();
  const { registerClient } = useCustomData();

  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setSubmitting(true);

    // Separar nombre y apellido si viene todo en fullName o lastName
    const nameParts = fullName.trim().split(' ');
    const nombre = nameParts[0] || fullName.trim();
    const Apellido = lastName.trim() || nameParts.slice(1).join(' ') || 'General';

    const clientPayload = {
      nombre,
      Apellido,
      correo: email.trim(),
      contrasena: password,
      telefono: phone.trim() || '0000-0000',
      estado: 'Activo',
      fechaRegistro: new Date().toISOString(),
      fotoPerfil: 'https://via.placeholder.com/150',
      isVerified: true,
    };

    const result = await registerClient(clientPayload);
    setSubmitting(false);

    if (result.success) {
      Alert.alert(
        '¡Registro Exitoso en API!',
        `El cliente ${nombre} ${Apellido} fue guardado correctamente en la API.`,
        [
          {
            text: 'Iniciar Sesión',
            onPress: () => router.push('/'),
          },
        ]
      );
    } else {
      Alert.alert(
        'Aviso de Registro',
        `No se pudo enviar a la API remota, pero el registro local fue completado para ${nombre}.`,
        [
          {
            text: 'Ir a Iniciar Sesión',
            onPress: () => router.push('/'),
          },
        ]
      );
    }
  };

  const handleSocialRegister = (provider) => {
    Alert.alert(
      'Registro con ' + provider,
      `Iniciando registro mediante ${provider}...`,
      [{ text: 'Entendido' }]
    );
  };

  const handleGoToLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return {
    fullName,
    setFullName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword,
    loading: submitting,
    errors,
    focusedInput,
    setFocusedInput,
    handleRegister,
    handleSocialRegister,
    handleGoToLogin,
  };
}

