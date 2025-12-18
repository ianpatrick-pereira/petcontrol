import api from './api';

export const registrarVacuna = async (vacunaData) => {
  const response = await api.post('/vacunas', vacunaData);
  return response.data;
};

export const obtenerTodasLasVacunas = async () => {
  const response = await api.get('/vacunas');
  return response.data;
};

export const obtenerVacunaPorId = async (id) => {
  const response = await api.get(`/vacunas/${id}`);
  return response.data;
};

export const obtenerVacunasPorMascota = async (mascotaId) => {
  const response = await api.get(`/vacunas/mascota/${mascotaId}`);
  return response.data;
};

export const eliminarVacuna = async (id) => {
  const response = await api.delete(`/vacunas/${id}`);
  return response.data;
};