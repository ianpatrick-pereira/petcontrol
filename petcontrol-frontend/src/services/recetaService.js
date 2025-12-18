import api from './api';

export const crearReceta = async (recetaData) => {
  const response = await api.post('/recetas', recetaData);
  return response.data;
};

export const obtenerTodasLasRecetas = async () => {
  const response = await api.get('/recetas');
  return response.data;
};

export const obtenerRecetaPorId = async (id) => {
  const response = await api.get(`/recetas/${id}`);
  return response.data;
};

export const obtenerRecetasPorMascota = async (mascotaId) => {
  const response = await api.get(`/recetas/mascota/${mascotaId}`);
  return response.data;
};

export const eliminarReceta = async (id) => {
  const response = await api.delete(`/recetas/${id}`);
  return response.data;
};