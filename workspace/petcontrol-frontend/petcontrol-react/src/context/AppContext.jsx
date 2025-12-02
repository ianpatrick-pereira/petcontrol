import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { mascotaService } from '../services/mascotaService';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = authService.getUsuarioActual();
    if (usuario) {
      setUsuarioActual(usuario);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const usuario = await authService.login(email, password);
      setUsuarioActual(usuario);
      return usuario;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, nombre) => {
    try {
      const usuario = await authService.register(email, password, nombre);
      setUsuarioActual(usuario);
      return usuario;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUsuarioActual(null);
  };

  const obtenerMisMascotas = async () => {
    return await mascotaService.getMisMascotas();
  };

  const agregarMascota = async (mascota) => {
    return await mascotaService.createMascota(mascota);
  };

  const editarMascota = async (id, mascota) => {
    return await mascotaService.updateMascota(id, mascota);
  };

  const borrarMascota = async (id) => {
    return await mascotaService.deleteMascota(id);
  };

  const obtenerTodasLasMascotas = async () => {
    // map to admin endpoint if available
    return await (mascotaService.getAllMascotasAdmin ? mascotaService.getAllMascotasAdmin() : Promise.resolve([]));
  };

  const obtenerTodasLasMascotasVeterinario = async () => {
    return await mascotaService.getAllMascotasVeterinario();
  };

  const value = {
    usuarioActual,
    loading,
    login,
    register,
    logout,
    obtenerMisMascotas,
    agregarMascota,
    editarMascota,
    borrarMascota,
    obtenerTodasLasMascotas,
    obtenerTodasLasMascotasVeterinario
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};