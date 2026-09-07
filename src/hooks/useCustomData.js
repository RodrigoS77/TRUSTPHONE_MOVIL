import { API_ENDPOINTS } from '../config/api';

const useCustomData = () => {

  // Función para autenticar al cliente: POST con correo y contrasena hacia /api/loginClientes
  const loginClient = async (correo, contrasena) => {
    const apiUrl = API_ENDPOINTS.LOGIN_CLIENTES();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo.trim(),
          contrasena: contrasena.trim(),
          email: correo.trim(),
          password: contrasena.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (response.ok) {
        return {
          success: true,
          user: data.cliente || data.user || data.usuario || data,
          message: data.message || 'Sesión iniciada con éxito',
        };
      }

      return {
        success: false,
        error: data.message || data.error || 'Credenciales incorrectas.',
      };
    } catch (err) {
      const isTimeout = err.name === 'AbortError';
      return {
        success: false,
        error: isTimeout
          ? `Tiempo de espera agotado al conectar con el servidor (${apiUrl}). Asegúrate de que el teléfono y la PC estén en la misma red Wi-Fi.`
          : `Error al conectar con ${apiUrl}: ${err.message}`,
      };
    }
  };

  // Función para registrar un nuevo cliente hacia /api/clientes
  const registerClient = async (clientPayload) => {
    const apiUrl = API_ENDPOINTS.CLIENTES();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (response.ok) {
        return {
          success: true,
          user: data.cliente || data.user || data.usuario || data,
          message: data.message || 'Cliente registrado con éxito',
        };
      }

      return {
        success: false,
        error: data.message || data.error || 'No se pudo registrar el cliente.',
      };
    } catch (err) {
      const isTimeout = err.name === 'AbortError';
      return {
        success: false,
        error: isTimeout
          ? `Tiempo de espera agotado al conectar con el servidor (${apiUrl}).`
          : `No se pudo conectar con el servidor (${apiUrl}): ${err.message}`,
      };
    }
  };

  return {
    loginClient,
    registerClient,
  };
};

export default useCustomData;
