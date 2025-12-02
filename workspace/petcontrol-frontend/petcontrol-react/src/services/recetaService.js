import api from './api';

export const recetaService = {
  // Endpoints para VETERINARIO - crear/gestionar recetas
  createReceta: async (recetaData) => {
    const response = await api.post('/veterinario/recetas', recetaData);
    return response.data;
  },

  getAllRecetas: async () => {
    const response = await api.get('/veterinario/recetas');
    return response.data;
  },

  getRecetaById: async (id) => {
    const response = await api.get(`/veterinario/recetas/${id}`);
    return response.data;
  },

  getRecetasPorMascota: async (mascotaId) => {
    const response = await api.get(`/veterinario/recetas/mascota/${mascotaId}`);
    return response.data;
  },

  deleteReceta: async (id) => {
    const response = await api.delete(`/veterinario/recetas/${id}`);
    return response.data;
  },

  // Endpoint para CLIENTE - ver recetas de su mascota
  getRecetasDeMiMascota: async (mascotaId) => {
    const response = await api.get(`/mascotas/${mascotaId}/recetas`);
    return response.data;
  }
};
