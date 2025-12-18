import api from '../config/api';

// Admin: Get all users
export const getAllUsuarios = async () => {
  const response = await api.get('/admin/usuarios');
  return response.data;
};

// Admin: Get user by ID
export const getUsuarioById = async (id) => {
  const response = await api.get(`/admin/usuarios/${id}`);
  return response.data;
};

// Admin: Delete user
export const deleteUsuario = async (id) => {
  const response = await api.delete(`/admin/usuarios/${id}`);
  return response.data;
};

// Update own profile
export const updateProfile = async (userData) => {
  const response = await api.put('/usuarios/profile', userData);
  return response.data;
};

// Change password
export const changePassword = async (oldPassword, newPassword) => {
  const response = await api.put('/usuarios/change-password', {
    oldPassword,
    newPassword
  });
  return response.data;
};

// Get all clients (for veterinarians)
export const getAllClientes = async () => {
  const response = await api.get('/api/usuarios/clientes');
  return response.data;
};