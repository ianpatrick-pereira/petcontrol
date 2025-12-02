import api from './api';

export const mascotaService = {
  async obtenerMisMascotas() {
    try {
      const response = await api.get('/mascotas/mis-mascotas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      throw error;
    }
  },

  async obtenerMascotaPorId(id) {
    try {
      const response = await api.get(`/mascotas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener mascota:', error);
      throw error;
    }
  },

  async crearMascota(mascota) {
    try {
      const response = await api.post('/mascotas', mascota);
      return response.data;
    } catch (error) {
      console.error('Error al crear mascota:', error);
      throw error;
    }
  },

  async actualizarMascota(id, mascota) {
    try {
      const response = await api.put(`/mascotas/${id}`, mascota);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
      throw error;
    }
  },

  async eliminarMascota(id) {
    try {
      await api.delete(`/mascotas/${id}`);
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      throw error;
    }
  },

  async obtenerTodasLasMascotas() {
    try {
      const response = await api.get('/admin/mascotas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener todas las mascotas:', error);
      throw error;
    }
  }
};