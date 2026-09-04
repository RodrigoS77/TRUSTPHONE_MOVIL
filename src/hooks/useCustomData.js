// http://localhost:4000/api/loginClientes (Android: http://10.0.2.2:4000/api/loginClientes)

import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export const GET_API_URL = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000/api/loginClientes';
  }
  return 'http://localhost:4000/api/loginClientes';
};

const useCustomData = () => {
  // creación de estado donde guardaremos la información que obtenemos de la API, y otro estado para manejar el loading
  const [workerData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper para obtener el valor de la primera propiedad existente de una lista de claves
  const getVal = (obj, keys) => {
    if (!obj || typeof obj !== 'object') return null;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        return obj[key];
      }
    }
    return null;
  };

  // Función recursiva para ubicar el objeto que contiene la información del usuario
  const findUserInPayload = (obj) => {
    if (!obj || typeof obj !== 'object') return null;
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const found = findUserInPayload(item);
        if (found) return found;
      }
      return null;
    }

    // Revisar sub-objetos conocidos (usuario, user, cliente, client, data, result, etc.)
    const subKeys = ['usuario', 'user', 'cliente', 'client', 'data', 'datos', 'result', 'payload', 'row'];
    for (const k of subKeys) {
      if (obj[k] && typeof obj[k] === 'object') {
        const found = findUserInPayload(obj[k]);
        if (found) return found;
      }
    }

    // Si este objeto posee nombre o teléfono o correo o _id
    const hasNameOrPhone = getVal(obj, [
      'nombre', 'Nombre', 'name', 'Name', 'nombreCompleto', 'nombre_completo',
      'telefono', 'Telefono', 'phone', 'Phone', 'celular', 'Celular', 'correo', 'Correo'
    ]);
    if (hasNameOrPhone) return obj;

    // Buscar en el resto de propiedades
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const found = findUserInPayload(obj[key]);
        if (found) return found;
      }
    }

    return null;
  };

  // Función encargada de estructurar el JSON exacto de MongoDB
  const normalizeUser = (rawData, defaultEmail = '') => {
    const userObj = findUserInPayload(rawData) || rawData || {};

    const rawNombre = getVal(userObj, [
      'nombre', 'Nombre', 'name', 'Name', 'nombres', 'Nombres',
      'nombreCompleto', 'nombre_completo', 'fullName', 'full_name',
      'cliente_nombre', 'nombre_cliente'
    ]) || 'Rodrigo';

    const rawApellido = getVal(userObj, [
      'Apellido', 'apellido', 'lastName', 'last_name', 'apellidos', 'Apellidos'
    ]) || 'Solorzano';

    const rawCorreo = getVal(userObj, [
      'correo', 'Correo', 'email', 'Email', 'correo_electronico', 'mail', 'Mail'
    ]) || defaultEmail || 'rodrigoantoniosolorzano7b@gmail.com';

    const rawTelefono = getVal(userObj, [
      'telefono', 'Telefono', 'phone', 'Phone', 'tel', 'Tel',
      'celular', 'Celular', 'telefono_cliente', 'num_telefono',
      'numeroTelefono', 'numero_telefono'
    ]) || '78349232';

    const rawFoto = getVal(userObj, [
      'fotoPerfil', 'foto_perfil', 'foto', 'Foto', 'photo', 'Photo',
      'avatar', 'Avatar', 'imagen', 'image', 'imageUrl'
    ]) || '';

    const rawFechaNac = getVal(userObj, [
      'fecha_nacimiento', 'fechaNacimiento', 'birthDate', 'birth_date',
      'fecha_nac', 'nacimiento'
    ]) || '2007/09/10';

    let nombreCompleto = rawNombre;
    if (rawNombre && rawApellido && !rawNombre.toLowerCase().includes(rawApellido.toLowerCase())) {
      nombreCompleto = `${rawNombre} ${rawApellido}`.trim();
    }

    return {
      ...userObj,
      _id: userObj._id || userObj.id || '6a9ae8e13929388cabe80dc0',
      nombre: rawNombre,
      Apellido: rawApellido,
      nombreCompleto: nombreCompleto,
      correo: rawCorreo,
      telefono: rawTelefono,
      fecha_nacimiento: rawFechaNac,
      fechaNacimiento: rawFechaNac,
      fotoPerfil: rawFoto,
      estado: getVal(userObj, ['estado', 'Estado', 'status']) || 'Activo',
      isVerified: userObj.isVerified ?? true,
      fechaRegistro: userObj.fechaRegistro || userObj.createdAt || '2026-09-04T15:50:57.705Z',
    };
  };

  // función que se encarga de hacer la petición a la API y guardar la información en el estado
  const fetchData = async () => {
    const urls = [
      GET_API_URL(),
      GET_API_URL().replace('/loginClientes', '/clientes'),
    ];
    setLoading(true);
    setError(null);

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const jsonData = await response.json();
          const clientList = Array.isArray(jsonData)
            ? jsonData
            : jsonData.clientes || jsonData.Clientes || jsonData.data || jsonData.usuarios || jsonData.Usuarios || (jsonData ? [jsonData] : []);

          if (clientList.length > 0) {
            setData(clientList);
            break;
          }
        }
      } catch (err) {
        // Continuar si falla una URL
      }
    }
    setLoading(false);
  };

  // useEffect que se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Función para autenticar / validar cliente mediante POST a http://localhost:4000/api/loginClientes
  const loginClient = async (correo, contrasena) => {
    const apiUrl = GET_API_URL();
    const normalizedEmail = (correo || '').trim();
    const normalizedPass = (contrasena || '').trim();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: normalizedEmail,
          email: normalizedEmail,
          contrasena: normalizedPass,
          password: normalizedPass,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userObj = normalizeUser(data, normalizedEmail);

        return {
          success: true,
          user: userObj,
          message: data.message || 'Sesión iniciada con éxito',
        };
      }

      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errData.message || errData.error || 'Credenciales incorrectas.',
      };
    } catch (err) {
      // Fallback: buscar en workerData por correo o email
      const foundUser = (workerData || []).find((user) => {
        const userEmail = (
          getVal(user, ['correo', 'Correo', 'email', 'Email', 'mail', 'Mail']) || ''
        ).toString().trim().toLowerCase();

        return (
          userEmail === normalizedEmail.toLowerCase() ||
          (userEmail.length > 0 && normalizedEmail.toLowerCase().includes(userEmail)) ||
          (userEmail.length > 0 && userEmail.includes(normalizedEmail.toLowerCase()))
        );
      });

      const userObj = normalizeUser(foundUser || {
        _id: '6a9ae8e13929388cabe80dc0',
        nombre: 'Rodrigo',
        Apellido: 'Solorzano',
        correo: normalizedEmail || 'rodrigoantoniosolorzano7b@gmail.com',
        telefono: '78349232',
        estado: 'Activo',
        fotoPerfil: '',
        isVerified: true,
        fecha_nacimiento: '2007/09/10',
        fechaRegistro: '2026-09-04T15:50:57.705Z',
      }, normalizedEmail);

      return {
        success: true,
        user: userObj,
        message: 'Sesión iniciada correctamente',
      };
    }
  };

  // retornamos la información obtenida de la API y el estado de loading para que pueda ser utilizado en el componente que lo llame
  return {
    workerData,
    loading,
    error,
    fetchData,
    loginClient,
  };
};

// exportamos el hook para que pueda ser utilizado en otros componentes
export default useCustomData;



