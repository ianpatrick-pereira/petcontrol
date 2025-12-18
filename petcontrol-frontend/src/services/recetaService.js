import api from '../config/api';

// Get prescriptions for a pet
export const getRecetasByMascota = async (mascotaId) => {
  const response = await api.get(`/recetas/mascota/${mascotaId}`);
  return response.data;
};

// Create new prescription (VETERINARIO, ADMIN)
export const createReceta = async (recetaData) => {
  const response = await api.post('/recetas', recetaData);
  return response.data;
};

// Update prescription
export const updateReceta = async (id, recetaData) => {
  const response = await api.put(`/recetas/${id}`, recetaData);
  return response.data;
};

// Delete prescription
export const deleteReceta = async (id) => {
  const response = await api.delete(`/recetas/${id}`);
  return response.data;
};