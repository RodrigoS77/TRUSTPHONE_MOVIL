// Hook para obtener el catálogo de celulares desde http://localhost:4000/api/celulares

import { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS } from './useCustomData';

const GET_PHONES_URL = () => API_ENDPOINTS.CELULARES();

const usePhones = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const fetchPhones = useCallback(async () => {
    const apiUrl = GET_PHONES_URL();
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const jsonData = await response.json();
        // Soporta distintas estructuras de respuesta
        const phoneList = Array.isArray(jsonData)
          ? jsonData
          : jsonData.value || jsonData.celulares || jsonData.data || jsonData.phones || [];
        setPhones(phoneList);
      } else {
        setError(`Error del servidor: ${response.status}`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Tiempo de espera agotado. Verifica que el servidor esté en ejecución.');
      } else {
        setError('No se pudo conectar con el servidor. Verifica que esté activo en el puerto 4000.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  // Filtros disponibles basados en los datos
  const getFilters = () => {
    const brands = [...new Set(phones.map((p) => p.marca || p.brand || '').filter(Boolean))];
    return ['Todos', ...brands.slice(0, 5)];
  };

  // Catálogo filtrado según búsqueda y filtro activo
  const filteredPhones = phones.filter((phone) => {
    const name = (phone.nombre || phone.name || phone.modelo || '').toLowerCase();
    const brand = (phone.marca || phone.brand || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = name.includes(query) || brand.includes(query);

    if (activeFilter === 'Todos') return matchesSearch;
    return matchesSearch && (phone.marca || phone.brand || '').toLowerCase() === activeFilter.toLowerCase();
  });

  return {
    phones,
    filteredPhones,
    loading,
    error,
    fetchPhones,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filters: getFilters(),
  };
};

export default usePhones;
