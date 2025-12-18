import api from '../config/api';

// Get vaccines for a pet
export const getVacunasByMascota = async (mascotaId) => {
  const response = await api.get(`/vacunas/mascota/${mascotaId}`);
  return response.data;
};

// Create new vaccine record (VETERINARIO, ADMIN)
export const createVacuna = async (vacunaData) => {
  const response = await api.post('/vacunas', vacunaData);
  return response.data;
};

// Update vaccine record
export const updateVacuna = async (id, vacunaData) => {
  const response = await api.put(`/vacunas/${id}`, vacunaData);
  return response.data;
};

// Delete vaccine record
export const deleteVacuna = async (id) => {
  const response = await api.delete(`/vacunas/${id}`);
  return response.data;
};