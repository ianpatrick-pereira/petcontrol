import api from '../config/api';

// Get user's own pets
export const getMisMascotas = async () => {
  const response = await api.get('/mascotas/mis-mascotas');
  return response.data;
};

// Get pets by client ID (for veterinarians and admins)
export const getMascotasPorCliente = async (clienteId) => {
  const response = await api.get(`/mascotas/cliente/${clienteId}`);
  return response.data;
};

// Get pet by ID
export const getMascotaById = async (id) => {
  const response = await api.get(`/mascotas/${id}`);
  return response.data;
};

// Create new pet
export const createMascota = async (mascotaData) => {
  const response = await api.post('/mascotas', mascotaData);
  return response.data;
};

// Update pet
export const updateMascota = async (id, mascotaData) => {
  const response = await api.put(`/mascotas/${id}`, mascotaData);
  return response.data;
};

// Delete pet
export const deleteMascota = async (id) => {
  const response = await api.delete(`/mascotas/${id}`);
  return response.data;
};

// Get pet's medical history (vaccines + recipes)
export const getHistorialMedico = async (mascotaId) => {
  const response = await api.get(`/mascotas/${mascotaId}/historial`);
  return response.data;
};

// Get pet's recipes
export const getRecetasDeMascota = async (mascotaId) => {
  const response = await api.get(`/mascotas/${mascotaId}/recetas`);
  return response.data;
};

// Admin: Get all pets
export const adminGetAllMascotas = async () => {
  const response = await api.get('/admin/mascotas');
  return response.data;
};

// Admin: Delete any pet
export const adminDeleteMascota = async (id) => {
  const response = await api.delete(`/admin/mascotas/${id}`);
  return response.data;
};