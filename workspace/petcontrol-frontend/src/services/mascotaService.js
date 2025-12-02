import api from './api';

export const mascotaService = {
  // Endpoints para todos los usuarios autenticados
  getMisMascotas: async () => {
    const response = await api.get('/mascotas');
    return response.data;
  },

  getMascotaById: async (id) => {
    const response = await api.get(`/mascotas/${id}`);
    return response.data;
  },

  createMascota: async (mascotaData) => {
    const response = await api.post('/mascotas', mascotaData);
    return response.data;
  },

  updateMascota: async (id, mascotaData) => {
    const response = await api.put(`/mascotas/${id}`, mascotaData);
    return response.data;
  },

  deleteMascota: async (id) => {
    const response = await api.delete(`/mascotas/${id}`);
    return response.data;
  },

  // Endpoints específicos para VETERINARIO
  getAllMascotasVeterinario: async () => {
    const response = await api.get('/veterinario/mascotas');
    return response.data;
  },

  getMascotaByIdVeterinario: async (id) => {
    const response = await api.get(`/veterinario/mascotas/${id}`);
    return response.data;
  },

  buscarMascotas: async (nombre, especie) => {
    const params = new URLSearchParams();
    if (nombre) params.append('nombre', nombre);
    if (especie) params.append('especie', especie);
    const response = await api.get(`/veterinario/mascotas/buscar?${params.toString()}`);
    return response.data;
  },

  getAllUsuarios: async () => {
    const response = await api.get('/veterinario/usuarios');
    return response.data;
  },

  getEstadisticas: async () => {
    const response = await api.get('/veterinario/estadisticas');
    return response.data;
  },

  // Endpoints específicos para ADMIN
  getAllMascotasAdmin: async () => {
    const response = await api.get('/admin/mascotas');
    return response.data;
  },

  getAllUsuariosAdmin: async () => {
    const response = await api.get('/admin/usuarios');
    return response.data;
  },

  deleteUsuarioAdmin: async (id) => {
    const response = await api.delete(`/admin/usuarios/${id}`);
    return response.data;
  },

  deleteMascotaAdmin: async (id) => {
    const response = await api.delete(`/admin/mascotas/${id}`);
    return response.data;
  }
};