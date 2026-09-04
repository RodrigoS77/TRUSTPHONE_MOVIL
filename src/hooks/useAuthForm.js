import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import useCustomData from './useCustomData';

export function useAuthForm() {
  const router = useRouter();
  const { workerData, loading: apiLoading, error: apiError, loginClient, fetchData } = useCustomData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setFormLoading(true);

    try {
      // Petición de validación a http://localhost:4000/api/loginClientes
      const result = await loginClient(email, password);
      setFormLoading(false);

      if (result.success && result.user) {
        const userObj = result.user;
        setCurrentUser(userObj);

        Alert.alert(
          '¡Bienvenido a TrustPhone!',
          `Sesión iniciada correctamente en la API.\n\nUsuario: ${userObj.nombre} ${userObj.Apellido}\nCorreo: ${userObj.correo}`,
          [{ text: 'Aceptar' }]
        );
      } else {
        Alert.alert(
          'Error de Autenticación',
          result.error || 'No se pudo iniciar sesión con las credenciales proporcionadas.',
          [{ text: 'Entendido' }]
        );
      }
    } catch (err) {
      setFormLoading(false);
      Alert.alert(
        'Error de Conexión',
        'No se pudo conectar con http://localhost:4000/api/loginClientes.',
        [{ text: 'Aceptar' }]
      );
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSocialLogin = (provider) => {
    Alert.alert(
      'Continuar con ' + provider,
      `Iniciando autenticación mediante ${provider}...`,
      [{ text: 'Entendido' }]
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Contraseña',
      'Te enviaremos las instrucciones para restablecer tu contraseña si existe una cuenta asociada.',
      [{ text: 'Aceptar' }]
    );
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    loading: formLoading || apiLoading,
    apiLoading,
    apiError,
    workerData,
    currentUser,
    handleLogout,
    fetchData,
    errors,
    focusedInput,
    setFocusedInput,
    handleLogin,
    handleSocialLogin,
    handleForgotPassword,
    handleSignUp,
  };
}

